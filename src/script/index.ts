import mysql from 'mysql2';
import Dish from './json2CSV/Dish';
import OpeningHours from './json2CSV/OpeningHours';
import OrderHistory from './json2CSV/OrderHistory';
import Restaurant from './json2CSV/Restaurant';
import User from './json2CSV/User';
import etl from './etl';
import RestaurantService from '../db/service/RestaurantService';

let pool: any;

function escapeStringRegexp(string: string) {
  if (typeof string !== 'string') {
    throw new TypeError('Expected a string');
  }
  return string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/'/g, "'");
}

async function connectDb() {
  if (pool != null) return pool;
  pool = await mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'glints',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  return pool;
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
        }
      });
      offset += limit;
    }
    const intervalId = setInterval(_mapper, 1000);
  }

  async run() {
    await connectDb();
    console.log('calling parser', Date.now());
    // await User.run();
    // await Restaurant.run();
    // await Dish.run();
    // await OpeningHours.run();
    // await OrderHistory.run();

    // console.log('calling etl script now', Date.now());

    // await etl.run(pool, '../../datadump/restaurant.csv', 'restaurant');
    // await etl.run(pool, '../../datadump/user.csv', 'user');
    // await etl.run(pool, '../../datadump/dish.csv', 'dish');
    // await etl.run(pool, '../../datadump/orderHistory.csv', 'orderHistory');
    // await etl.run(pool, '../../datadump/openingHours.csv', 'openingHours');

    console.log('Linking orders to restaurant and dish');
    this.mappingOrderToRestaurant();
    console.log('Linked orders to restaurant and dish successfuly');
  }
}

export default new ETLScript();
