import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tweet-card',
  templateUrl: './tweet-card.component.html',
  styleUrls: ['./tweet-card.component.scss']
})
export class TweetCardComponent implements OnInit {

  @Input()
  title: string;
  @Input()
  text: string;
  @Input()
  createdAt: Date;
  constructor() { }

  ngOnInit() {
  }

}
