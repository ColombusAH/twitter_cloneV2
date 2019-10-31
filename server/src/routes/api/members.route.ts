import express from 'express';
import { validateShortId } from '../../middlewares/validate-shortId.middleware';
import * as memberController from '../../controllers/members.controller';

const router = express.Router();

router.route('/:id').get(validateShortId, memberController.getMemberByID);

export default router;
