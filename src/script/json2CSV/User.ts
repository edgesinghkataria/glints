import json2CSV from './json2CSV';

export default class User {
  static async run() {
    const userInputFilePath = '../../../datadump/users.json';
    const outputFilePath = '../../../datadump/';

    await json2CSV.convert(
      userInputFilePath,
      ['id', 'name', 'cashBalance'],
      `${outputFilePath}user.csv`
    );
  }
}
