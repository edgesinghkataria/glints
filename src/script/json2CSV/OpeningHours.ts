import json2CSV from './json2CSV';
import moment from 'moment';

export default class OpeningHours {
  private static getTime(timeRange: string[]): number {
    const AMorPM = String(timeRange.pop());
    const time = timeRange.pop();

    const momentTime = moment(
      `${time} ${AMorPM}`,
      `hh:mm ${AMorPM.toLocaleLowerCase() === 'am' ? 'a' : 'A'}`
    );
    return momentTime.diff(moment().startOf('day'), 'minutes');
  }

  private static getDay(timeRange: string[]): string {
    if (timeRange.length === 0) return '';
    const dayAbrv = timeRange.pop();
    return moment(dayAbrv, 'ddd').format('dddd');
  }

  private static listifyTimeRange(ele: string): string[] {
    return ele
      .split(' ')
      .map(item => {
        // removing hyphens
        if (!item || item === '-') return '';
        // replacing commas
        return item.replace(/,/g, '');
      })
      .filter(Boolean);
  }

  static async run() {
    const restaurantInputFilePath = '../../../datadump/restaurant.json';
    const outputFilePath = '../../../datadump/';

    let counter = 1;
    await json2CSV.convert(
      restaurantInputFilePath,
      [
        'id',
        'restaurantId',
        'day',
        'dayStringify',
        'openingTime',
        'closingTime',
      ],
      `${outputFilePath}openingHours.csv`,
      [
        (item: any) => {
          item.id = counter++;
          item.restaurantId = item.id;
          item.timingList = [];
          const openingHours = item.openingHours;
          const splitTimeSlots = openingHours.split('/');

          splitTimeSlots.map((ele: string) => {
            const timeRangeInList = OpeningHours.listifyTimeRange(ele);
            const closingTime = OpeningHours.getTime(timeRangeInList);
            const openingTime = OpeningHours.getTime(timeRangeInList);
            const days = [];

            let day = OpeningHours.getDay(timeRangeInList);
            while (day && day !== 'Invalid Date') {
              days.push(day);
              day = OpeningHours.getDay(timeRangeInList);
            }

            item.timingList = [
              ...item.timingList,
              ...days.map(day => ({
                day: `${day}`,
                openingTime: openingTime,
                closingTime: closingTime,
              })),
            ];
          });

          const firstItem = item.timingList.shift();
          item.openingTime = firstItem.openingTime;
          item.closingTime = firstItem.closingTime;
          item.day = firstItem.day;

          item.dayStringify = JSON.stringify(item.timingList);
          return item;
        },
      ]
    );
  }
}
