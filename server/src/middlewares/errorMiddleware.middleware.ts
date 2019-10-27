import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/httpErrors';

export function ErrorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof HttpError) {
    return res.status(error.status).send(error.message);
  } else {
    next(error);
  }
}
