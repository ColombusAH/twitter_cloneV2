import express from 'express';
import { validateId } from '../../middlewares/validate-id.middleware';
import * as memberController from '../../controllers/members.controller';

const router = express.Router();

router.route('/:id').get(validateId, memberController.getMemberByID);

// router.get('/', (req, res, nexr) => {
//   return res.send('test');
// });

export default router;
