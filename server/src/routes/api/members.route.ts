import express from 'express';
import { validateShortId } from '../../middlewares/validate-shortId.middleware';
import * as memberController from '../../controllers/members.controller';
import passport from 'passport';

const router = express.Router();

//requirement 3
router.route('/:id').get(validateShortId, memberController.getMemberByID);

// requirement 4
router
  .route('/:id/tweets')
  .get(
    validateShortId,
    passport.authenticate(['jwt', 'anonymous'], { session: false }),
    memberController.getMemberTweetsByShortID
  );

export default router;