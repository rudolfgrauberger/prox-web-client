
import {KeycloakService} from 'keycloak-angular';
import {environment} from '../../environments/environment';

export function keycloakInitializer(keycloak: KeycloakService): () =>
  Promise<any> {
  if (environment.production) {
    return () => keycloak.init({
      config: environment.keycloak,
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe: true,
      },
      enableBearerInterceptor: false,
    });
  } else {
    return () => keycloak.init({
      config: environment.keycloak,
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe: true,
      },
      enableBearerInterceptor: false,
      bearerExcludedUrls: [
        'study-courses', 'studycourses',
        'projects',
      ]
    });
  }
}
