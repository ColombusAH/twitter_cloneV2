import { IUserForLogin, IUserForRegister } from './../models/user.model';
import { JwtService } from './jwt.service';
import { IUser } from '../models/user.model';
import { Injectable } from '@angular/core';
import { observable, autorun, computed, action, reaction } from 'mobx';
import { take, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  @observable
  private user: IUser;
  // tslint:disable-next-line: variable-name
  @observable private _isLoggedIn: boolean;

  private readonly apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private jwtService: JwtService) {
    this._isLoggedIn = jwtService.tokenIsValid();
  }

  // computed
  @computed get isLoggedIn() {
    return this._isLoggedIn;
  }

  // actions
  @action authentication(
    type: string,
    creds: IUserForLogin | IUserForRegister
  ) {
    return this.http.post<IUser>(this.apiUrl + `/auth/${type}`, creds).pipe(
      take(1),
      map(user => {
        if (user) {
          this.user = user;
          this.jwtService.saveToken(user.token);
          this._isLoggedIn = true;
          return true;
        } else {
          this._isLoggedIn = false;
          return false;
        }
      })
    );
  }

  @action logout() {
    this.jwtService.destroyToken();
    this._isLoggedIn = false;
  }
}
