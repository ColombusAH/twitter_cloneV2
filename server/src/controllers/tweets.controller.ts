import { IStarredTweet } from './../dtos/tweets/starredTweet.dto';
import {
  NotFoundError,
  NotOwnerError,
  InternalError
} from './../errors/httpErrors';
import { ITweet } from './../dtos/tweets/Tweet.dto';
import { Request, Response, NextFunction } from 'express';
import { OK, CREATED, NO_CONTENT } from 'http-status-codes';
import * as tweetService from '../services/tweet.service';
import IUser from '../dtos/userDtos/IUser.dto';
import IUserWithStarred from '../dtos/userDtos/IUserForStarred.dto';
const MongoOkResponse = 1;

export async function addTweet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { text } = req.body;
    const user = req.user as IUser;
    const tweet = await tweetService.createTweet(user, text);
    return res.status(CREATED).send(tweet);
  } catch (error) {
    next(error);
  }
}

export async function AllTweets(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user as IUserWithStarred;
    let tweets: ITweet[] | IStarredTweet[];
    if (user) {
      tweets = await tweetService.getAllTweetsIncludeStarredFlag(user);
    } else {
      tweets = await tweetService.getAllTweets();
    }

    return res.status(CREATED).send(tweets);
  } catch (error) {
    next(error);
  }
}

export async function deleteTweet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const shortid = req.params.id;
  const user = req.user as IUser;
  try {
    const tweet: ITweet = await tweetService.getTweetByShortId(shortid);
    if (!tweet) {
      throw new NotFoundError('tweet not found');
    }

    if (user._id.toString() !== tweet.authorDetails._id.toString()) {
      throw new NotOwnerError('Not the owner');
    }

    const deleteResponse = await tweetService.deleteTweetByShortId(shortid);
    if (deleteResponse.ok !== MongoOkResponse) {
      throw new InternalError('Unable to delete tweet');
    }

    return res.sendStatus(NO_CONTENT);
  } catch (error) {
    next(error);
  }
}
