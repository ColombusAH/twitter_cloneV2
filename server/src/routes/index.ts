import express from 'express';
import { default as apiRouter } from './api';

const router = express.Router();

router.use('/api', apiRouter);

export default router;
