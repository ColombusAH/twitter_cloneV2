import { take, map } from 'rxjs/operators';
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

@Injectable({
  providedIn: 'root'
})
export class ProfileResolverService
  implements Resolve<IProfile | Observable<IProfile>> {
  constructor(private profileService: ProfileService, private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): IProfile | Observable<IProfile> {
    return this.profileService.getProfile('rlE7n0uK').pipe(
      map(profile => {
        console.log(profile);

        if (profile) {
          return profile as IProfile;
        } else {
          this.router.navigate(['/']);
          return null;
        }
      })
    );
  }
}
