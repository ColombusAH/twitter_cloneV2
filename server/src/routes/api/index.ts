import express from 'express';
import { default as authRouter } from './auth.route';

const router = express.Router();

router.use('/auth', authRouter);

export default router ;
