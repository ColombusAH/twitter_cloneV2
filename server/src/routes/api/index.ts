import express from 'express';
import { default as authRouter } from './auth.route';
import { default as membersRouter } from './members.route';
import { default as tweetsRouter } from './tweets.route';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/members', membersRouter);
router.use('/tweets', tweetsRouter);

export default router;
