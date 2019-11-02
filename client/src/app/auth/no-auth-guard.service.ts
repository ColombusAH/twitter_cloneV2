import { UserService } from '../core/services/user.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuardService implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate() {
    let response = false;
    this.userService.isLoggedIn$.pipe(take(1)).subscribe(userLoggedIn => {
      response = userLoggedIn;
      console.log(response);
    });
    return !response;
  }
}
