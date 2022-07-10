import json2CSV from './json2CSV';

class ETLScript {
  run(): void {
    const restaurantFilePath = '../../datadump/restaurant.json';
    const userFilePath = '../../datadump/users.json';

    json2CSV.convert(restaurantFilePath, ['restaurantId'], 'restaurant');
    // json2CSV.convert(restaurantFilePath, ['userId'], 'user');
    // json2CSV.convert(restaurantFilePath, ['userId'], 'userModal');
    // json2CSV.convert(restaurantFilePath, ['userId'], 'userModal');
    json2CSV.convert(userFilePath, ['id', 'name'], 'user');
  }
}

export default new ETLScript();
