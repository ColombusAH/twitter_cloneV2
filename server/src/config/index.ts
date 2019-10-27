import * as dotenv from 'dotenv';

dotenv.config();
let path: string;
switch (process.env.NODE_ENV) {
  case 'test':
    path = `${__dirname}/../env/.env.test`;
    break;
  case 'production':
    path = `${__dirname}/../env/.env.production`;
    break;
  default:
    //for development
    path = `${__dirname}/../env/.env.development`;
}
dotenv.config({ path: path });

export const PORT: number = +process.env.PORT;
export const DB_CONNECT: string = process.env.DB_CONNECT;
export const SECRET: string = process.env.SECRET;
export { default as auth } from './auth';
