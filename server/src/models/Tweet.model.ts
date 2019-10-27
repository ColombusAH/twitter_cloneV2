import mongoose, { Schema, Document } from 'mongoose';
import shortid from 'shortid';
import uniqueValidator from 'mongoose-unique-validator';

export interface ITweet extends Document {
  id: string;
  author: string;
  body: string;
  starCount: number;
  createdAt: Date;
}

const TweetSchema: Schema = new Schema(
  {
    _id: { type: String, default: shortid.generate() },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    body: { type: String, required: true, maxlength: 240 },
    starCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model<ITweet>('Tweet', TweetSchema);
