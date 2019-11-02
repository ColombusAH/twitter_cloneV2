import { JwtService } from '../services/jwt.service';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  Router
} from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private jwtService: JwtService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.jwtService.tokenIsValid()) {
      console.log('auth guard say OK!');
      return true;
    } else {
      console.log('auth guard say No!');

      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
