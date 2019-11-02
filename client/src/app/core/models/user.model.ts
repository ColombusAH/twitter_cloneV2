export interface IUser {
  _id: string;
  shortid: string;
  username: string;
  image: string;
  registrationDate: Date;
  lastLogin: Date;
}

export interface IUserCLaims {
  jwtToken: string;
  id: string;
}

export interface IUserForLogin {
  email: string;
  password: string;
}

export interface IUserForRegister extends IUserForLogin {
  username: string;
  confirmPassword: string;
  image?: string;
}
