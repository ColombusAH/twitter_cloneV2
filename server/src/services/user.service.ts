import User, { IUser } from '../models/User.model';

export async function findUserByEmail(email: string) {
  const user = await User.findOne({ email });
  return user;
}

export async function findUserById(id: string) {
  const user = await User.findOne({ _id: id });
  return user;
}

export async function findUserByShordId(id: string) {
  const user = await User.findOne({ shortid: id });
  return user;
}

export async function findUserByUsername(username: string) {
  const user: IUser = await User.findOne({ username });
  return user;
}

export async function createUser(
  username: string,
  email: string,
  password: string,
  image: string
) {
  let user: IUser = new User({
    username,
    email,
    image
  });
  user.setPassword(password);
  user.token = user.generateJWT();
  user = await user.save();
  return user;
}

