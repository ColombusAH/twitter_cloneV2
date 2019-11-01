import { IStarredTweet, StarredTweet } from './../dtos/tweets/starredTweet.dto';
import { IAuthorDetails } from '../dtos/tweets/authorDetails.dto';
import TweetModel from '../models/Tweet.model';
import _ from 'lodash';
import IUser from '../dtos/userDtos/IUser.dto';
import IUserForStarred from '../dtos/userDtos/IUserForStarred.dto';
import IUserWithStarred from '../dtos/userDtos/IUserForStarred.dto';

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
  return res;
}

export async function getAllTweets() {
  const tweetsData = await TweetModel.find({});
  return tweetsData;
}

export async function getAllTweetsIncludeStarredFlag(user: IUserWithStarred) {
  const tweetsData = await getAllTweets();
  const starredTweets = getTweetsWithStarredFlagDataByUser(tweetsData, user);
  return starredTweets;
}

export async function getTweetOfUserByShortId(shortid: string) {
  const tweetsData = await TweetModel.find({
    'authorDetails.shortid': shortid
  });
  return tweetsData;
}

export async function getTweetOfUserByShortIdIncludeStarred(
  shortid: string,
  user: IUserWithStarred
) {
  const tweetsData = await getTweetOfUserByShortId(shortid);
  const starredTweets = getTweetsWithStarredFlagDataByUser(tweetsData, user);
  return starredTweets;
}

function getTweetsWithStarredFlagDataByUser(
  tweetsData: Partial<IStarredTweet>[],
  user: IUserForStarred
) {
  const starredTweets = [] as IStarredTweet[];

  const tweetsIdStarredByUser = user.starred;
  _.each(tweetsData, (tweet, index) => {
    const starredTweet: StarredTweet = new StarredTweet(
      tweetsData[index],
      false
    );
    starredTweets.push(starredTweet);
    _.each(tweetsIdStarredByUser, id => {
      starredTweets[index].starredByMe = id.toString() === tweet._id.toString();
    });
  });
  return starredTweets;
}

export async function incrementTweetStarsById(id: string) {
  const res = await TweetModel.findOneAndUpdate(
    { _id: id },
    { $inc: { stars: 1 } },
    { new: true }
  );
  return res;
}

export async function decrementTweetStarsById(id: string) {
  const res = await TweetModel.findOneAndUpdate(
    { _id: id },
    { $inc: { stars: -1 } },
    { new: true }
  );
  console.log(res);
  return res;
}
