import { Component, OnInit } from '@angular/core';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  username = '';
  isLoggedIn = false;

  constructor(protected keycloakAngular: KeycloakService) { }

  async ngOnInit() {
    this.isLoggedIn = await this.keycloakAngular.isLoggedIn();

    if (this.isLoggedIn) {
      this.username = await this.keycloakAngular.getUsername();
    } else {
      this.username = '';
    }
  }

  async login() {
    await this.keycloakAngular.login();

    this.isLoggedIn = await this.keycloakAngular.isLoggedIn();
  }

  async logout() {
    await this.keycloakAngular.logout();

    this.isLoggedIn = await this.keycloakAngular.isLoggedIn();
  }
}
