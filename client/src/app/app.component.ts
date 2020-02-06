import { Component } from "@angular/core";
import { UserService } from "./core/services/user.service";
import { LoadingSpinnerService } from "./core/services/loading-spinner.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  userLoggedIn: boolean;
  spinnerMode$: Observable<boolean>;
  constructor(
    private userService: UserService,
    private loadingSpinnerService: LoadingSpinnerService
  ) {
    this.spinnerMode$ = this.loadingSpinnerService.spinnerMode$
  }
  title = "Tweeter";

  logout(sidenavbar) {
    sidenavbar.toggle();
    this.userService.logout();
  }
}
