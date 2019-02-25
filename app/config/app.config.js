import path from 'path';

export default {
   // address of mongodb
  DB_PATH: process.env.MONGOURI || 'mongodb://localhost:27017/monthlyBalance',
  // environment
  ENV: process.env.NODE_ENV || 'development',
  // port on which to listen
  PORT: 5000,
  // Whether to seed the db or not. This will delete all previous data.
  seedDB: process.env.SEED_DB || true,
  // path to root directory of this app
  root: path.normalize(__dirname),
  // API version
  api_v: 'v1'
}