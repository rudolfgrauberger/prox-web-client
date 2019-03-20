import { Component, OnInit } from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {KeyCloakUser} from '../../keycloak/KeyCloakUser';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  username = '';
  isLoggedIn = false;

  constructor(protected user: KeyCloakUser) {
  }

  async ngOnInit() {
    this.Load();
  }

  private async Load() {
    await this.user.Load();

    this.isLoggedIn = this.user.isLoggedIn();

    if (this.isLoggedIn) {
      this.username = this.user.getUserName();
    } else {
      this.username = '';
    }
  }

  async login() {
    await this.user.login();
    this.Load();
  }

  async logout() {
    await this.user.logout();
    this.Load();
  }
}
