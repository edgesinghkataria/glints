require('dotenv').config();
import Express from './server/Express';
import Database from './db/Database';
import Exception from './exception';

export default (async () => {
  try {
    const connectionInst = Database.intialize();

    connectionInst.authenticate();
    console.log('Connected to db successfully.');

    await Express.initialize();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw new Exception.ServerSetupException();
  }
})();
