import json2CSV from './json2CSV';

export default class OpeningHours {
  static async run() {
    const restaurantInputFilePath = '../../../datadump/restaurant.json';
    const outputFilePath = '../../../datadump/';

    let counter = 1;
    await json2CSV.convert(
      restaurantInputFilePath,
      ['id', 'openingHours'],
      `${outputFilePath}openingHours.csv`,
      [
        (item: any) => {
          item.id = counter++;
          const openingHours = item.openingHours;
          const splitTimeSlots = openingHours.split('/');

          // console.log(
          //   splitTimeSlots.map((slot: any) => {
          //     return slot.split('-');
          //   })
          // );

          return item;
        },
      ]
    );
  }
}
