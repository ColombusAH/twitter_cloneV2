import { ProfileResolverService } from './core/resolvers/profile-resolver.service';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { ProfileComponent } from './core/pages/profile/profile.component';
import { NoAuthGuardService } from './auth/no-auth-guard.service';
import { AboutComponent } from './core/pages/about/about.component';
import { HomeComponent } from './core/pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
    resolve: { userProfile: ProfileResolverService }
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('src/app/auth/auth.module').then(m => m.AuthModule),
    canActivate: [NoAuthGuardService]
  },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
