export interface ITweet {
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
}

export class Tweet implements ITweet {
  _id: string;
  shortid: string;
  authorDetails: { _id: string; shortid: string; image: string };
  text: string;
  stars: number;
  createdAt: Date;

  constructor(TweetRespone: any) {
    this._id = TweetRespone._id;
    this.shortid = TweetRespone.shortid;
    this.authorDetails = TweetRespone.authorDetails;
    this.text = TweetRespone.text;
    this.stars = TweetRespone.stars;
    this.createdAt = TweetRespone.createdAt;
  }
}
