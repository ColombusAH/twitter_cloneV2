import { ITweet, Tweet } from './Tweet.dto';

export interface IStarredTweet extends ITweet {
  starredByMe: boolean;
}

export class StarredTweet extends Tweet implements IStarredTweet {
  starredByMe: boolean;

  constructor(tweetResponse: any, starredByMe: boolean) {
    super(tweetResponse);
    this.starredByMe = starredByMe;
  }
}
