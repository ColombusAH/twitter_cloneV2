import { IUser } from './../models/User.model';
import { IAuthorDetails } from '../dtos/tweets/authorDetails.dto';
import TweetModel from '../models/Tweet.model';
import _ from 'lodash';

interface tweet2Return {
  _id: string;
  shortid: string;
  authorDetails: {
    _id: string;
    shortid: string;
    image: string;
  };
  text: string;
  stars: number;
  createdAt: Date;
  starredByMe: boolean;
}

export async function createTweet(user: IUser, text: string) {
  const authorDetails: IAuthorDetails = user;
  const tweet = await TweetModel.create({ authorDetails, text });
  return tweet;
}

export async function getAllTweets(user: IUser) {
  const tweets = await TweetModel.find({});
  console.log(tweets);

  const starredTweets = [];
  if (user) {
    _.each(tweets, (tweet, index) => {
      // const starred =
      const t: tweet2Return = {
        _id: tweet._id,
        shortid: tweet.shortid,
        authorDetails: tweet.authorDetails,
        text: tweet.text,
        stars: tweet.stars,
        createdAt: tweet.createdAt,
        starredByMe: false
      };
      t.starredByMe =
        _.findIndex(user.starred, tweetId => tweetId === tweet._id) !== -1;

      starredTweets.push(t);
    });
  }

  return starredTweets;
}
