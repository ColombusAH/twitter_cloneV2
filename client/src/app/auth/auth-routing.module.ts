import { AuthComponent } from './auth/auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const authRoutes: Routes = [
  { path: 'login', component: AuthComponent, pathMatch: 'full' },
  { path: 'register', component: AuthComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
