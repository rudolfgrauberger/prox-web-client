import {KeycloakConfig} from 'keycloak-angular';

const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8080/auth',
  realm: 'PTB',
  clientId: 'ptb-web-client'
};

export const environment = {
  production: true,
  keycloak: keycloakConfig,
  url: 'https://gpdev.archi-lab.io/'
};

