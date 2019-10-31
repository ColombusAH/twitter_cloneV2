import IUser from './IUser.dto';

export default interface IUserWithStarred extends IUser {
  starred: string[];
}
