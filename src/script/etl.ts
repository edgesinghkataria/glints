import fs from 'fs';
import path from 'path';
import etl from 'etl';
import mysql from 'mysql2';

// Create the connection pool. The pool-specific settings are the defaults

class ETL {
  async run(
    pool: any,
    sourceFile: string,
    tableName: string,
    transformFunc?: Function
  ) {
    if (!transformFunc) transformFunc = (data: any) => data;

    return (
      fs
        .createReadStream(path.join(__dirname, sourceFile))
        // parse the csv file
        .pipe(etl.csv())
        // map `date` into a javascript date and set unique _id
        .pipe(etl.map(transformFunc))
        .pipe(etl.mysql.script(pool, 'glints', tableName))
        .pipe(etl.mysql.execute(pool, 4))
        // Switch from stream to promise chain and report done or error
        .promise()
    );
  }
}

export default new ETL();
