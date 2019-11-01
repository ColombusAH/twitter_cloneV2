import express from 'express';
import morgan from 'morgan';
import * as config from './config';
import { join } from 'path';
import fs from 'fs';
import helmet from 'helmet';
import mongoose from 'mongoose';
import cors from 'cors';
import * as passport from './config/passport';
import router from './routes';
import { ErrorMiddleware } from './middlewares/HttpErrorHandlerMiddleware.middleware';

const app = express();

// set the log file.
const accessLogStream = fs.createWriteStream(
  join(__dirname, './logs/access.log'),
  { flags: 'a' }
);
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// register morgan to be my logger.
app.use(morgan('combined', { stream: accessLogStream }));

passport.initializePassport();

//for test
app.get('/', (req, res) => {
  res.send('Hello World');
});

//register the routes of the app.
app.use(router);

// register error middleware
app.use(ErrorMiddleware);

const PORT = config.PORT;

async function listen() {
  await mongoose.connect(
    config.DB_CONNECT,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    },
    () => console.log('connected to DB')
  );
  app.listen(PORT, () => {
    console.log(`Server is listennig at http://localhost:${PORT}/`);
  });
}
const server = { listen };
export default server;
