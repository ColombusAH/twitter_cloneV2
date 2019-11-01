import { UserExistError } from './../errors/httpErrors';
import passport from 'passport';
import HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import * as service from '../services/user.service';

// requiremen 2
function login(req: Request, res: Response) {
  passport.authenticate(
    'local',
    { session: false },
    async (err, user, info) => {
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
      user = user.toAuthJSON();
      return res
        .status(HttpStatus.OK)
        .send({ jwtToken: user.token, id: user.shortid });
    }
  )(req, res);
}

// requirement 1
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
