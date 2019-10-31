import { IUserModel } from './../models/User.model';
import UserModel from '../models/User.model';
import IUser from '../dtos/userDtos/IUser.dto';

export async function findUserByEmail(email: string) {
  const user = await UserModel.findOne({ email });
  return user;
}

export async function findUserById(id: string) {
  const user = await UserModel.findOne({ _id: id });
  return user;
}

export async function findUserByShordId(id: string) {
  const user = await UserModel.findOne({ shortid: id });
  return user;
}

export async function findUserByUsername(username: string) {
  const user: IUser = await UserModel.findOne({ username });
  return user;
}

export async function createUser(
  username: string,
  email: string,
  password: string,
  image: string
) {
  let user: IUserModel = new UserModel({
    username,
    email,
    image
  });
  user.setPassword(password);
  user.token = user.generateJWT();
  user = await user.save();
  return user;
}

