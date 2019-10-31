import { ITweet } from './../dtos/tweets/Tweet.dto';
import mongoose, { Schema, Document } from 'mongoose';
import shortid from 'shortid';

export interface ITweetModel extends ITweet, Document {
  _id: string;
}

const TweetSchema: Schema = new Schema(
  {
    shortid: { type: String, default: shortid.generate(), index: true },
    authorDetails: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      shortid: { type: String, index: true },
      image: String
    },
    text: { type: String, required: true, maxlength: 240 },
    stars: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model<ITweetModel>('Tweet', TweetSchema);
