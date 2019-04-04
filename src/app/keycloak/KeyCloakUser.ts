import {EventEmitter, Injectable} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {KeycloakLoginOptions} from 'keycloak-js';

@Injectable()
export class KeyCloakUser {

  onUserChanged = new EventEmitter();

  private _id = '';
  private _isLoggedIn = false;
  private _username = '';
  private _firstName = '';
  private _lastName = '';
  private _fullname = '';
  private _roles: string[] = [];


  constructor(protected keycloakAngular: KeycloakService) {
    this.Load();
  }

  public async Load() {
    this._isLoggedIn = await this.keycloakAngular.isLoggedIn();

    if (this._isLoggedIn) {

      this._roles = await this.keycloakAngular.getUserRoles(true);

      const keycloak = await this.keycloakAngular.getKeycloakInstance();

      keycloak.loadUserInfo().success((userInfo) => {
        this._id = userInfo['sub'];
        this._username = userInfo['preferred_username'];
        this._firstName = userInfo['given_name'];
        this._lastName = userInfo['family_name'];
        this._fullname = userInfo['name'];

        this.onUserChanged.emit();
      }).error(() => {
        this.Reset();
      });
    } else {
      this.Reset();
    }
  }

  private Reset() {

    this._id = '';
    this._username = '';
    this._firstName = '';
    this._lastName = '';
    this._fullname = '';
    this._roles = [];

    this._isLoggedIn = false;

    this.onUserChanged.emit();
  }

  public isLoggedIn(): boolean {
    return this._isLoggedIn;
  }
  public getUserName(): string {
    return this._username;
  }

  public getFullName(): string {
    return this._fullname;
  }

  public getID(): string {
    return this._id;
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
    await this.loginRedirect(window.location.href);
  }

  public async loginRedirect(uri: string) {
    await this.keycloakAngular.login({
      redirectUri: uri
    });
    await this.Load();
  }

  public async logout() {
    await this.keycloakAngular.logout(window.location.href);
    await this.Load();
  }
}
