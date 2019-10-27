import { UserService } from './../core/services/user.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuardService implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate() {
    return !this.userService.isLoggedIn;
  }
}
