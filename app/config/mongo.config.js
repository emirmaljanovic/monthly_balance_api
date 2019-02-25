import mongoose from 'mongoose';
import Promise from 'bluebird';

import APP_CONFIG from './app.config';

const {
  DB_PATH
} = APP_CONFIG;

export default () => {
  mongoose.connect(DB_PATH, { useMongoClient: true })
      .then(() => {
          console.info(`Connected to the database: ${DB_PATH}`);
      })
      .catch(err => {
          throw new Error(`Unable to connect to database at ${DB_PATH}`);
      });

  mongoose.connection.on('disconnected', (err) => {
      console.log('MongoDB event disconnected');
      console.log(err);
  });
}