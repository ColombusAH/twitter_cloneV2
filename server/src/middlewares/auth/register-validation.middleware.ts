import { Request, Response, NextFunction } from 'express';
import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';
import userForRegister from '../../dtos/userDtos/userForRegister.dto';

const userForRegisterSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .exist(),
  password: Joi.string()
    .required()
    .exist(),
  confirmPassword: Joi.any()
    .equal(Joi.ref('password'))
    .required()
    .exist(),
  username: Joi.string()
    .alphanum()
    .required()
    .exist()
});

export default function validateRegister(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userRegisterCreds: userForRegister = req.body;
  const { error, value } = userForRegisterSchema.validate(userRegisterCreds, {
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
