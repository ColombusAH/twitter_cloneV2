export interface IUser {
  username: string;
  token: string;
  image: string;
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
