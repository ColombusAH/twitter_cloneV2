import IUser, { User } from './IUser.dto';

export default interface IUserWithStarred extends IUser {
  starred: string[];
}

export class UserWithStarredTweets extends User implements IUserWithStarred {
  starred: string[];
  constructor(userResponse: any) {
    super(userResponse);
    this.starred = [];
    (userResponse.starred as string[]).forEach(id =>
      this.starred.push(id.toString())
    );
  }
}
