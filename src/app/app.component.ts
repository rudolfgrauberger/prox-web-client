import { Component, OnInit } from '@angular/core';
import { CacheHelper } from 'angular4-hal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Projekt- und Themenbörse';

  constructor() {
    CacheHelper.isActive = false;
  }
}
