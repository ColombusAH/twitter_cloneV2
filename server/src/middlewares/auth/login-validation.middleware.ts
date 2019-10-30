import { Request, Response, NextFunction } from 'express';
import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';
import IUserForLogin from '../../dtos/userDtos/userForLogin.dto';

const userForloginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .exist(),
  password: Joi.string()
    .required()
    .exist()
});

export default function validateLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userloginCreds: IUserForLogin = req.body;
  const { error, value } = userForloginSchema.validate(userloginCreds, {
    abortEarly: false
  });
  if (error) {
    const errorNessages: string[] = [];
    error.details.map(e => {
      errorNessages.push(e.message);
    });
    return res.status(HttpStatus.BAD_REQUEST).send(errorNessages);
  }
  next();
}
