
import {KeycloakService} from 'keycloak-angular';
import {environment} from '../../environments/environment';

export function keycloakInitializer(keycloak: KeycloakService): () =>
  Promise<any> {
  if (environment.production) {
    return () => keycloak.init({
      config: environment.keycloak,
      initOptions: {
        checkLoginIframe: false
      },
      enableBearerInterceptor: false,
    });
  } else {
    return () => keycloak.init({
      config: environment.keycloak,
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe: false
      },
      enableBearerInterceptor: false,
      bearerExcludedUrls: [
        'study-courses', 'studycourses',
        'projects',
      ]
    });
  }
}
