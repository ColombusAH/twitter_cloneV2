export default interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  image: string;
  validPassword: (password: string) => boolean;
  generateJWT: () => string;
  setPassword: (password: string) => void;
  toAuthJSON: () => {};
  hash: string;
  token: string;
}
