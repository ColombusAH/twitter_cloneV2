import { ITweet } from './Tweet.dto';

export interface ITweetForStarred extends ITweet {
  starredByMe: boolean;
}
