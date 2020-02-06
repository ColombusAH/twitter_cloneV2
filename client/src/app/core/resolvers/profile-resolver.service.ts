import { IUser } from './../models/user.model';
import { environment } from './../../../environments/environment';
import { take, map, delay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProfileService } from './../services/profile.service';
import { IProfile } from './../models/profile.model';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { LoadingSpinnerService } from '../services/loading-spinner.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolverService
  implements Resolve<IProfile | Observable<IProfile>> {
  constructor(private profileService: ProfileService, private router: Router, private loadingSpinnerService: LoadingSpinnerService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): IProfile | Observable<IProfile> {
    this.loadingSpinnerService.turSpinnerOnRequest();
    return this.profileService
      .getProfile(route.paramMap.get(environment.idKey))
      .pipe(delay(1000),
        take(1),
        map(userProfile => {
          this.loadingSpinnerService.turSpinnerOffRequest();
          if (userProfile) {
            return userProfile as IUser;
          } else {
            this.router.navigate(['/']);
            return null;
          }
        })
      );
  }
}
