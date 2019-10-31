import { ITweet } from './../dtos/tweets/Tweet.dto';
import { IStarredTweet } from './../dtos/tweets/starredTweet.dto';

import { IUser } from './../models/User.model';
import { IAuthorDetails } from '../dtos/tweets/authorDetails.dto';
import TweetModel from '../models/Tweet.model';
import _ from 'lodash';

export async function createTweet(user: IUser, text: string) {
  const authorDetails: IAuthorDetails = user;
  const tweet = await TweetModel.create({ authorDetails, text });
  return tweet;
}

export async function getTweetByShortId(shortid: string) {
  const tweet = await TweetModel.findOne({ shortid });
  return tweet;
}

export async function deleteTweetByShortId(shortid: string) {
  const res = await TweetModel.deleteOne({ shortid });
  console.log(res);

  return res;
}

export async function getAllTweets(user: IUser) {
  const tweetsData = (await TweetModel.find({})) as Partial<IStarredTweet>[];
  const starredTweets = [] as IStarredTweet[];
  if (user) {
    const tweetsIdStarredByUser = user.starred;
    _.each(tweetsData, (tweet, index) => {
      _.each(tweetsIdStarredByUser, id => {
        const starredTweet: IStarredTweet = {
          _id: tweet._id,
          shortid: tweet._id,
          text: tweet.text,
          stars: tweet.stars,
          createdAt: tweet.createdAt,
          authorDetails: tweet.authorDetails,
          starredByMe: id.toString() === tweet._id.toString()
        };
        starredTweets.push(starredTweet);
      });
    });
    return starredTweets;
  } else {
    return tweetsData;
  }
}
