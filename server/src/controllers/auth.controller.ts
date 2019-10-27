import { UserExistError } from './../errors/httpErrors';
import passport from 'passport';
import IUser from '../dtos/userDtos/userForAuth.dto';
import HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import * as service from '../services/user.service';

function login(req: Request, res: Response) {
  passport.authenticate(
    'local',
    { session: false },
    async (err, user: IUser, info) => {
      if (err || !user) {
        return res.status(HttpStatus.BAD_REQUEST).send({ info });
      }

      req.login(user, { session: false }, error => {
        if (error) {
          return res
            .status(HttpStatus.BAD_REQUEST)
            .send({ info: 'failed to login' });
        }
      });

      return res.status(HttpStatus.OK).send(user.toAuthJSON());
    }
  )(req, res);
}

async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password, email, image } = req.body;

    const userByEmail = await service.findUserByEmail(email);

    if (userByEmail) {
      throw new UserExistError('email already exist');
    }

    const userByUsrname = await service.findUserByUsername(username);
    if (userByUsrname) {
      throw new UserExistError('username already exist');
    }

    const user = await service.createUser(username, email, password, image);

    return res.status(HttpStatus.OK).send(user.toAuthJSON());
  } catch (error) {
    next(error);
  }
}

const AuthController = {
  login,
  register
};

export default AuthController;
