import express from 'express';
import { default as authRouter } from './auth.route';
import { default as membersRouter } from './members.route';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/members', membersRouter);

export default router;
