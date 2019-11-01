import { User } from './../dtos/userDtos/IUser.dto';
import { IStarredTweet } from './../dtos/tweets/starredTweet.dto';
import { ITweet } from './../dtos/tweets/Tweet.dto';
import { Request, Response, NextFunction } from 'express';
import { OK } from 'http-status-codes';
import { NotFoundError } from './../errors/httpErrors';
import * as userService from '../services/user.service';
import * as tweetService from '../services/tweet.service';
import IUser from '../dtos/userDtos/IUser.dto';
import IUserWithStarred from '../dtos/userDtos/IUserForStarred.dto';

// requirement 3
export async function getMemberByShortID(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const userdata = await userService.findUserByShordId(id);
    let user: IUser = new User(userdata);
    if (!userdata) {
      throw new NotFoundError('member not found');
    }

    return res.status(OK).send(user);
  } catch (error) {
    next(error);
  }
}

// requirement 4 : get member tweets by ID

export async function getMemberTweetsByShortID(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const memberid = req.params.id;
    const member = await userService.findUserByShordId(memberid);
    if (!member) {
      throw new NotFoundError('No member');
    }
    const user = req.user as IUserWithStarred;
    let tweets: ITweet[] | IStarredTweet[];
    if (user) {
      tweets = await tweetService.getTweetOfUserByShortIdIncludeStarred(
        memberid,
        user
      );
    } else {
      tweets = await tweetService.getTweetOfUserByShortId(memberid);
    }
    return res.status(OK).send(tweets);
  } catch (error) {
    next(error);
  }
}
