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
