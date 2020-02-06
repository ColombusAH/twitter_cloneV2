import { IUser } from "./../../models/user.model";
import { IProfile } from "./../../models/profile.model";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { TweetsService } from "../../services/tweets.service";
import { Tweet } from "../../models/tweet.model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  userProfile: IUser;
  tweets$: Observable<Tweet[]>;
  private readonly expectedObject = "userProfile";
  
  constructor(
    private route: ActivatedRoute,
    private tweetService: TweetsService
  ) {}

  ngOnInit() {
    this.userProfile = this.route.snapshot.data[this.expectedObject];
    this.tweets$ = this.tweetService.getUserTweets(this.userProfile.shortid);
  }
}
