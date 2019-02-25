import path from 'path';
import helmet from 'helmet';
import express from 'express';
import bodyParser from 'body-parser';

import Router from './routes';
import MongoConfig from './config/mongo.config';
import APP_CONFIG from './config/app.config';
import Seed from './seeds';

const {
  PORT,
  api_v,
  seedDB
} = APP_CONFIG;

const app = express();
MongoConfig();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

if (seedDB) Seed();

app.use(`/api/${api_v}`, Router);

// START AND STOP
const server = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

process.on('SIGINT', () => {
    console.log('\nshutting down!');
    // db.close();
    server.close();
    process.exit();
});