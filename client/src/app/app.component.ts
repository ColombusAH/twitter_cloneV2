import { Component } from '@angular/core';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userLoggedIn: boolean;
  constructor(private userService: UserService) {}
  title = 'Tweeter';

  logout(sidenavbar) {
    sidenavbar.toggle();
    this.userService.logout();
  }
}
