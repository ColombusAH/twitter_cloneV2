import express from 'express';
import AuthController from '../../controllers/auth.controller';
import * as validators from '../../middlewares';

const router = express.Router();

router.post('/login', validators.validateLogin, AuthController.login);
router.post('/register', validators.validateRegister, AuthController.register);

export default router;
