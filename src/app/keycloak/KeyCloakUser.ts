import {Injectable} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';

@Injectable()
export class KeyCloakUser {

  private _isLoggedIn = false;
  private _username = '';
  private _roles: string[] = [];

  constructor(protected keycloakAngular: KeycloakService) {
    this.Load();
  }

  public async Load() {
    this._isLoggedIn = await this.keycloakAngular.isLoggedIn();

    if (this._isLoggedIn) {
      this._username = await this.keycloakAngular.getUsername();
      this._roles = await this.keycloakAngular.getUserRoles(true);
    } else {
      this._username = '';
      this._roles = [];
    }
  }

  public isLoggedIn(): boolean {
    return this._isLoggedIn;
  }
  public getUserName(): string {
    return this._username;
  }

  public hasRole(role: string): boolean {
    for (const i in this._roles) {
      if (this._roles[i].toUpperCase() === role.toUpperCase()) {
        return true;
      }
    }
    return false;
  }

  public async login() {
    await this.keycloakAngular.login();
    await this.Load();
  }
  public async logout() {
    await this.keycloakAngular.logout(location.origin);
    await this.Load();
  }
}
