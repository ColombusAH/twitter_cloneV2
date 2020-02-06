import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, BehaviorSubject } from "rxjs";
import { Tweet } from "../models/tweet.model";

@Injectable({
  providedIn: "root"
})
export class TweetsService {
  private readonly userTweetsSubject = new BehaviorSubject<Tweet[]>([]);
  public userTweets$: Observable<Tweet[]>;

  constructor(private http: HttpClient) {}

  getUserTweets(id: string): Observable<Tweet[]> {
    this.userTweets$ = this.http.get<Tweet[]>(
      `${environment.memberUrl}${id}/tweets`
    );
    return this.userTweets$;
  }
}
