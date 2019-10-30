import { ITweet } from './../dtos/tweets/Tweet.dto';
import mongoose from 'mongoose';
import shortid from 'shortid';

export interface ITweet extends mongoose.Document {
  _id: string;
  shortid: string;
  authorDetails: {
    _id: string;
    shortid: string;
    image: string;
  };
  text: string;
  stars: number;
  createdAt: Date;
  starredByMe?: boolean;
}

const TweetSchema: mongoose.Schema = new mongoose.Schema(
  {
    shortid: { type: String, default: shortid.generate(), index: true },
    authorDetails: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      shortid: String,
      image: String
    },
    text: { type: String, required: true, maxlength: 240 },
    stars: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model<ITweet>('Tweet', TweetSchema);
