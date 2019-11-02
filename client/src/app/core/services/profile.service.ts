import { IUser } from './../models/user.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfile(id: string) {
    return this.http.get<IUser>(environment.memberUrl + `${id}`);
  }
}
