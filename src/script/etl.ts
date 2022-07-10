import fs from 'fs';
import etl from 'etl';
import Database from '../db/Database';

class ETL {
  init() {
    fs.createReadStream('../../datadump/restaurant.json')
      // parse the csv file
      .pipe(etl.json())
      // map `date` into a javascript date and set unique _id
      .pipe(
        etl.map((d: any) => ({
          restaurantName: d.restaurantName,
        }))
      )
      // collect 1000 records at a time for bulk-insert
      .pipe(etl.collect(1000))
      // upsert records to elastic with max 10 concurrent server requests
      .pipe(
        etl.mysql.upsert(Database, 'glints', 'restaurant', {concurrency: 4})
      )
      // Switch from stream to promise chain and report done or error
      // .promise()
      .then(
        () => console.log('done'),
        (e: any) => console.log('error', e)
      );
  }
}

export default new ETL();
