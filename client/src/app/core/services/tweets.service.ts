import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, BehaviorSubject } from "rxjs";
import { Tweet } from "../models/tweet.model";

@Injectable({
  providedIn: "root"
})
export class TweetsService {
  tweetsSubject = new BehaviorSubject<Tweet[]>([]);
  tweets$: Observable<Tweet[]>;

  constructor(private http: HttpClient) {}

  getTweets(id: string): Observable<Tweet[]> {
    return (this.tweets$ = this.http.get<Tweet[]>(
      `${environment.memberUrl}${id}/tweets`
    ));
  }
}
