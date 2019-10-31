import { BadIdFormatError } from '../errors/httpErrors';
import { Request, Response, NextFunction } from 'express';
import shortid from 'shortid';

export function validateShortId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;

  if (!shortid.isValid(id)) {
    throw new BadIdFormatError('ID not valid');
  } else {
    console.log('id valid');

    next();
  }
}
