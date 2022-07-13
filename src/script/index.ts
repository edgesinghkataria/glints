import mysql from 'mysql2';
import OpeningHours from './json2CSV/OpeningHours';
import User from './json2CSV/User';
import Restaurant from './json2CSV/Restaurant';
import Dish from './json2CSV/Dish';
import OrderHistory from './json2CSV/OrderHistory';
import {getRestaurantScheduleInput} from '../db/service/RestaurantService';
import etl from './etl';

let pool: any;

async function connectDb() {
  if (pool != null) return pool;
  pool = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  return pool;
}

interface getRestaurantSchedule extends getRestaurantScheduleInput {
  day: string;
}

class ETLScript {
  private async mappingOrderToRestaurant() {
    const limit = 100;
    let offset = 0;
    async function _mapper() {
      const rangeData = await pool
        .promise()
        .query(`SELECT * FROM orderHistory limit ${limit} offset ${offset}`);

      if (rangeData[0].length < limit) {
        clearInterval(intervalId);
      }

      await Promise.all(
        rangeData[0].map(async (item: any) => {
          try {
            // console.log(escapeStringRegexp(item.restaurantName));
            if (!item.restaurantName) return;
            const query = `SELECT * FROM restaurant WHERE restaurantName="${item.restaurantName}" limit 1`;
            const restaurantData = await pool.promise().query(query);
            // console.log(restaurantData[0][0]);

            if (!restaurantData[0][0]) {
              console.log('restaurant is not found', item);
            }
            const dishData = await pool
              .promise()
              .query(
                `SELECT * FROM dish WHERE restaurantId='${restaurantData[0][0].id}' AND dishName="${item.dishName}" limit 1`
              );

            if (!dishData[0][0]) {
              console.log(dishData[0][0], ' dish is empty ', item);
            }

            item.restaurantData = restaurantData[0][0];
            item.dishData = dishData[0][0];
          } catch (error) {
            console.log(error, item);
            clearInterval(intervalId);
          }
        })
      );
      rangeData[0].forEach(async (data: any) => {
        try {
          if (!data.restaurantData || !data.dishData) {
            return console.log('restaurantData or dishData is empty');
          }
          await pool
            .promise()
            .query(
              `UPDATE orderHistory set restaurantId=${data.restaurantData.id}, dishId=${data.dishData.id} WHERE restaurantName="${data.restaurantName}" AND dishName="${data.dishName}"`
            );
        } catch (error) {
          console.error('error while ETL', error);
          clearInterval(intervalId);
        }
      });
      offset += limit;
    }
    // processing 100 entries per second
    const intervalId = setInterval(_mapper, 1000);
  }

  private async deserializeOpeningData() {
    const limit = 100;
    let offset = 0;
    let entries = [];
    const totalEntries = await pool
      .promise()
      .query(`SELECT count(id) as count FROM openingHours`);
    console.log(totalEntries);

    async function _mapper(): Promise<boolean> {
      const rangeData = await pool
        .promise()
        .query(`SELECT * FROM openingHours limit ${limit} offset ${offset}`);

      entries = rangeData[0].filter((data: any) => data.dayStringify);

      const promiseList: any[] = [];

      entries.forEach(insertTime);
      function insertTime(item: any) {
        if (item.dayStringify.length < 10) return;
        const scheduleList = JSON.parse(item.dayStringify);

        scheduleList.forEach((schedule: getRestaurantSchedule) => {
          // pushing new data
          promiseList.push(
            pool
              .promise()
              .query(
                `INSERT INTO openingHours (id, restaurantId, day, dayStringify, openingTime, closingTime) VALUES (NULL, ${item.restaurantId}, "${schedule.day}", "", ${schedule.openingTime}, ${schedule.closingTime})`
              )
          );
        });
      }

      await Promise.all(promiseList);

      if (entries.length === 0) {
        return true;
      } else {
        offset += limit;
        return _mapper();
      }
    }

    await pool.promise().query(
      `ALTER TABLE openingHours
        DROP COLUMN dayStringify;`
    );

    _mapper();
  }

  async run() {
    await connectDb();
    console.log('calling parser', Date.now());
    await User.run();
    await Restaurant.run();
    await Dish.run();
    await OpeningHours.run();
    await OrderHistory.run();

    // console.log('calling etl script now', Date.now());

    await etl.run(pool, '../../datadump/restaurant.csv', 'restaurant');
    await etl.run(pool, '../../datadump/user.csv', 'user');
    await etl.run(pool, '../../datadump/dish.csv', 'dish');
    await etl.run(pool, '../../datadump/orderHistory.csv', 'orderHistory');
    await etl.run(pool, '../../datadump/openingHours.csv', 'openingHours');

    console.log('Linking orders to restaurant and dish');
    this.mappingOrderToRestaurant();
    console.log('Linked orders to restaurant and dish successfuly');
    console.log('serializing opening time');
    this.deserializeOpeningData();
    console.log('serialized opening time successfuly');
  }
}

export default new ETLScript();
