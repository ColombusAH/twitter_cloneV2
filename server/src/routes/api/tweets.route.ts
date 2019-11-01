import passport from 'passport';
import express from 'express';
import { validateTweetText } from '../../middlewares/tweets/tweet-validation.middleware';
import * as tweetsController from '../../controllers/tweets.controller';
import { validateShortId } from '../../middlewares/validate-shortId.middleware';

const router = express.Router();

// requirement 5
router
  .route('/')
  .post(
    passport.authenticate('jwt', { session: false }),
    validateTweetText,
    tweetsController.addTweet
  ) // requirement 6
  .get(
    passport.authenticate(['jwt', 'anonymous'], { session: false }),
    tweetsController.AllTweets
  );
//requirement 7
router
  .route('/:id')
  .delete(
    passport.authenticate('jwt', { session: false }),
    validateShortId,
    tweetsController.deleteTweet
  );

router
  .route('/:id/star-toggle')
  .post(
    passport.authenticate('jwt', { session: false }),
    validateShortId,
    tweetsController.starToggleTweet
  );
export default router;
