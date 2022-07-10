require('dotenv').config();
import Express from './server/Express';
import Database from './db/Database';
import Exception from './exception';
import etl from './script';

(async () => {
  try {
    const connectionInst = Database.intialize();

    connectionInst.authenticate();
    console.log('Connected to db successfully.');

    await etl.run();

    await Express.initialize();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw new Exception.ServerSetupException();
  }
})();
