import json2CSV from './json2CSV';

export default class Restaurant {
  static async run() {
    const restaurantInputFilePath = '../../../datadump/restaurant.json';
    const outputFilePath = '../../../datadump/';

    let counter = 1;
    const restaurantTransform = [
      (item: any) => {
        item.id = counter++;
        return item;
      },
    ];
    await json2CSV.convert(
      restaurantInputFilePath,
      ['id', 'restaurantName', 'cashBalance'],
      `${outputFilePath}restaurant.csv`,
      restaurantTransform
    );
  }
}
