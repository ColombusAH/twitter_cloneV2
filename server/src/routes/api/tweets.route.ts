import express from 'express';
import { validateTweetText } from '../../middlewares/auth/tweet-validation.middleware';
import * as tweetsController from '../../controllers/tweets.controller';
import passport from 'passport';

const router = express.Router();

// requirement 5
router
  .route('/')
  .post(
    passport.authenticate('jwt', { session: false }),
    validateTweetText,
    tweetsController.addTweet
  )
  .get(
    passport.authenticate('jwt-optional', { session: false }),
    tweetsController.AllTweets
  );

export default router;
