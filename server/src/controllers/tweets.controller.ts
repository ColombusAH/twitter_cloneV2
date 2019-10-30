import { IUser } from './../models/User.model';
import { Request, Response, NextFunction } from 'express';
import { OK, CREATED } from 'http-status-codes';
import * as tweetService from '../services/tweet.service';

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
    const user = req.user as IUser;
    const tweets = await tweetService.getAllTweets(user);

    return res.status(CREATED).send(tweets);
  } catch (error) {
    next(error);
  }
}
