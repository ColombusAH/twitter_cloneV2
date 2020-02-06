import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class LoadingSpinnerService {
  constructor() {}

  private readonly spinnerCounterSubject = new BehaviorSubject<number>(0);
  public readonly spinnerMode$ = this.spinnerCounterSubject
    .asObservable()
    .pipe(tap((cnt)=>console.log(cnt),
    ),map(counter => counter > 0));

  turSpinnerOnRequest() {
    this.spinnerCounterSubject.next(this.spinnerCounterSubject.value + 1);
  }

  turSpinnerOffRequest() {
    let counter = this.spinnerCounterSubject.value - 1;
    counter = counter > 0 ? counter : 0;
    this.spinnerCounterSubject.next(counter);
  }
}
