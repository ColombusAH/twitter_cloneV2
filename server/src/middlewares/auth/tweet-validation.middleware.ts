import { InputValidationError } from './../../errors/httpErrors';
import { Request, Response, NextFunction } from 'express';
import Joi from '@hapi/joi';

const maxLength = 240;

const tweetBodySchema = Joi.object({
  text: Joi.string()
    .required()
    .exist()
    .max(maxLength)
});

export function validateTweetText(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const text = req.body;
  console.log(req.body);

  const { error, value } = tweetBodySchema.validate(text);

  if (error) {
    throw new InputValidationError(error.message);
  }
  next();
}
