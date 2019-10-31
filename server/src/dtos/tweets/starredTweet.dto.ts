import { ITweet } from './Tweet.dto';

export interface IStarredTweet extends ITweet {
  starredByMe: boolean;
}
