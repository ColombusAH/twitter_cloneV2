import mongoose, { Schema, Document } from 'mongoose';
import shortid from 'shortid';
import uniqueValidator from 'mongoose-unique-validator';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import * as config from '../config';

export interface IUser extends Document {
  username: string;
  email: string;
  image: string;
  validPassword: (password: string) => boolean;
  generateJWT: () => string;
  setPassword: (password: string) => void;
  toAuthJSON: () => {};
  hash: string;
  token: string;
  registrationDate: Date;
  lastLogin: Date;
}

const UserSchema: Schema = new Schema(
  {
    _id: {
      type: String,
      default: shortid.generate()
    },
    username: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      index: true
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true
    },
    lastLogin: { type: Date, default: Date.now() },

    image: { type: String, required: false },
    hash: { type: String, required: true },
    salt: { type: String, required: true }
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, { message: 'is already taken' });

UserSchema.methods.setPassword = function(password: string) {
  this.salt = CryptoJS.lib.WordArray.random(16);
  this.hash = CryptoJS.PBKDF2(password, this.salt, {
    keySize: 512 / 32,
    iterations: 1000
  });
};

UserSchema.methods.validPassword = function(password: string) {
  const hash = CryptoJS.PBKDF2(password, this.salt, {
    keySize: 512 / 32,
    iterations: 1000
  });

  return this.hash.toString() === hash.toString();
};

UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 30);

  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      // tslint:disable-next-line: radix
      exp: parseInt(`${exp.getTime() / 1000}`)
    },
    config.SECRET
  );
};

UserSchema.methods.toAuthJSON = function() {
  return {
    username: this.username,
    email: this.email,
    _id: this._id,
    token: this.generateJWT(),
    image: this.image,
    registrationDate: this.createdAt,
    lastLogin: this.lastLogin
  };
};

export default mongoose.model<IUser>('User', UserSchema);
