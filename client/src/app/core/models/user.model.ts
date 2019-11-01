export interface IUser {
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
