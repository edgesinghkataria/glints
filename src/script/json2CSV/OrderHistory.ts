import {transforms} from 'json2csv';
import json2CSV from './json2CSV';
import moment from 'moment';

export default class OrderHistory {
  static async run() {
    const outputFilePath = '../../../datadump/';
    const userInputFilePath = '../../../datadump/users.json';

    // TODO: need to look into this, remove entrh if purchaseHistory not fonud
    let orderCounter = 1;
    let userId = 1;
    const orderTransform = [
      transforms.unwind({paths: ['purchaseHistory']}),
      (item: any) => {
        if (item.id) {
          userId = item.id;
        }
        const {purchaseHistory} = item;
        const newItem = {
          userId,
          ...item,
          ...purchaseHistory,
          id: orderCounter,
          dishId: 0,
          restaurantId: 0,
        };

        if (purchaseHistory && purchaseHistory.length > 0) {
          const {transactionDate} = purchaseHistory;

          const dateLen = transactionDate.length;

          const AMorPM = transactionDate
            .substring(dateLen - 2, dateLen - 1)
            .toLocaleLowerCase();

          const momentDate = moment(
            transactionDate,
            `MM/DD/YYYY hh:mm ${AMorPM !== 'a' ? 'A' : AMorPM}`
          ).toISOString();
          newItem.transactionDate = new Date(momentDate);
        }

        ++orderCounter;
        return newItem;
      },
    ];
    await json2CSV.convert(
      userInputFilePath,
      [
        'id',
        'userId',
        'dishId',
        'restaurantId',
        'dishName',
        'restaurantName',
        'transactionAmount',
        'transactionDate',
      ],
      `${outputFilePath}orderHistory.csv`,
      orderTransform
    );
  }
}
