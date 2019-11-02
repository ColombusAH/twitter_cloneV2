import { ProfileService } from './profile.service';
import { environment } from '../../../environments/environment';
import { IUserForLogin, IUserForRegister } from '../models/user.model';
import { JwtService } from './jwt.service';
import { IUser } from '../models/user.model';
import { Injectable } from '@angular/core';
import { take, map, distinctUntilChanged } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<IUser>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private profileService: ProfileService
  ) {
    const userid = localStorage.getItem(environment.idKey);
    if (jwtService.tokenIsValid() && userid) {
      this.profileService
        .getProfile(userid)
        .pipe(
          take(1),
          map(user => user)
        )
        .subscribe(user => {
          console.log(user);
          this.currentUserSubject.next(user);
        });
    }
  }

  authentication(type: string, creds: IUserForLogin | IUserForRegister) {
    return this.http
      .post<any>(environment.apiUrl + `/auth/${type}`, creds)
      .pipe(
        take(1),
        map(data => {
          if (data.jwtToken) {
            this.setAuth(data);
            return true;
          } else {
            this.logout();
            return false;
          }
        })
      );
  }

  setAuth(data: { user: IUser; jwtToken: string }) {
    this.jwtService.saveToken(data.jwtToken);
    localStorage.setItem(environment.idKey, data.user.shortid);
    this.currentUserSubject.next(data.user);
    this.isLoggedInSubject.next(true);
  }

  logout() {
    this.jwtService.destroyToken();
    localStorage.removeItem(environment.idKey);
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
  }
}
