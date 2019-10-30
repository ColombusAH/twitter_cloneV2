import mongoose from 'mongoose';
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
