import { OK } from 'http-status-codes';
import { NotFoundError } from './../errors/httpErrors';
import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';

export async function getMemberByID(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const user = await userService.findUserById(id);
    if (!user) {
      throw new NotFoundError('member not found');
    }
    return res.status(OK).send(user.toAuthJSON());
  } catch (error) {
    next(error);
  }
}
