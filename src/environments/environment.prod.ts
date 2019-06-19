import { KeycloakConfig } from 'keycloak-angular';

const keycloakConfig: KeycloakConfig = {
  url: 'https://login.coalbase.io/auth',
  realm: 'prox',
  clientId: 'ptb-web-client'
};

export const environment = {
  production: true,
  keycloak: keycloakConfig,
  url: 'https://api.dev.prox.archi-lab.io'
};
