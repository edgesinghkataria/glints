import {transforms} from 'json2csv';
import json2CSV from './json2CSV';

export default class Dish {
  static async run() {
    const restaurantInputFilePath = '../../../datadump/restaurant.json';
    const outputFilePath = '../../../datadump/';

    let counter = 0;
    let dishCounter = 1;
    let prevRestaurantName: string;
    const menuTransform = [
      transforms.unwind({paths: ['menu'], blankOut: true}),
      (item: any) => {
        if (item.restaurantName) {
          ++counter;
        }
        const newItem = {
          id: dishCounter++,
          dishName: item.menu.dishName,
          price: item.menu.price,
          restaurantId: counter,
        };
        return newItem;
      },
    ];
    await json2CSV.convert(
      restaurantInputFilePath,
      ['id', 'restaurantId', 'dishName', 'price'],
      `${outputFilePath}dish.csv`,
      menuTransform
    );
  }
}
