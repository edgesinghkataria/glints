import Express from '../server/Express';
import Database from '../db/Database';

process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  // Express.getInstance().close(() => {
  //   console.log('HTTP server closed');
  // });
  await Database.getInstance().close();
});
