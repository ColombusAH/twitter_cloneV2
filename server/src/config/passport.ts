import * as AnonymousStrategy from 'passport-anonymous';
import passport from 'passport';
import passportLocal from 'passport-local';
import passportJwt from 'passport-jwt';


import * as config from '../config';
import * as service from '../services/user.service';

export function initializePassport() {
  const LocalStrategy = passportLocal.Strategy;
  const JwtStrategy = passportJwt.Strategy;
  const ExtractJwt = passportJwt.ExtractJwt;

  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      async (email: string, password: string, done) => {
        try {
          const user = await service.findUserByEmail(email);

          if (!user || !user.validPassword(password)) {
            return done(null, false, {
              message: 'email or password are wrong'
            });
          }
          return done(null, user, { message: 'success' });
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.SECRET
      },
      async (jwtPayload, done) => {
        try {
          const user = await service.findUserById(jwtPayload.id);
          if (!user) {
            done(null, false);
          }
          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

 passport.use(new AnonymousStrategy.Strategy());
}
