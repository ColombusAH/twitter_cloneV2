import { environment } from './../../../environments/environment';
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
  private isLoggedInSubject: BehaviorSubject<boolean>;
  public isLoggedIn$: Observable<boolean>;

  constructor(private http: HttpClient, private jwtService: JwtService) {
    this.isLoggedInSubject = new BehaviorSubject(
      this.jwtService.tokenIsValid()
    );
    this.isLoggedIn$ = this.isLoggedInSubject
      .asObservable()
      .pipe(distinctUntilChanged());
  }

  authentication(type: string, creds: IUserForLogin | IUserForRegister) {
    return this.http
      .post<IUser>(environment.apiUrl + `/auth/${type}`, creds)
      .pipe(
        take(1),
        map(data => {
          if (data.jwtToken) {
            this.jwtService.saveToken(data.jwtToken);
            localStorage.setItem('id', data.id);
            this.isLoggedInSubject.next(true);
            return true;
          } else {
            this.isLoggedInSubject.next(false);
            return false;
          }
        })
      );
  }

  logout() {
    this.jwtService.destroyToken();
    localStorage.removeItem('id');
    this.isLoggedInSubject.next(false);
  }
}
