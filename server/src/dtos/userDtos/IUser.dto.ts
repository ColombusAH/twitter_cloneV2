import { threadId } from 'worker_threads';

export default interface IUser {
  _id: string;
  shortid: string;
  username: string;
  image: string;
  registrationDate: Date;
  lastLogin: Date;
}

export class User implements IUser {
  _id: string;
  shortid: string;
  username: string;
  image: string;
  registrationDate: Date;
  lastLogin: Date;
  constructor(userResponse: any) {
    this._id = userResponse._id;
    this.shortid = userResponse.shortid;
    this.username = userResponse.username;
    this.image = userResponse.image;
    this.registrationDate = userResponse.createdAt;
    this.lastLogin = userResponse.lastLogin;
  }
}
