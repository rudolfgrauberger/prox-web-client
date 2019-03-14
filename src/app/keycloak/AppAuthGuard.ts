import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { KeycloakService, KeycloakAuthGuard } from 'keycloak-angular';

@Injectable()
export class AppAuthGuard extends KeycloakAuthGuard {
  constructor(protected router: Router, protected keycloakAngular: KeycloakService) {
    super(router, keycloakAngular);
  }

  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise(async (resolve, reject) => {

      try {
        console.log('isAccesAllow: ' + route.data.roles);

        if (route.data.roles == null) {
          console.log('No restrictions');
          resolve(true);
          return;
        }

        const isLoggedIn = await this.keycloakAngular.isLoggedIn();

        if (isLoggedIn) {
          console.log('userName: ' + await this.keycloakAngular.getUsername());
        } else {
          await this.keycloakAngular.login();
        }

        for (const requiredRole of route.data.roles) {
          if (this.keycloakAngular.isUserInRole(requiredRole)) {
            resolve(true);
            return;
          }

          resolve(false);
        }
      } catch (e) {
        console.log('isAccessAllowed error');
        console.log(e);
    }
    });
  }
}
