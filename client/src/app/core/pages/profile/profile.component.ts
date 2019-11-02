import { IProfile } from './../../models/profile.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile$: Observable<IProfile>;
  expectedObject = 'profile';
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.profile$ = this.route.snapshot.data[this.expectedObject];
  }
}
