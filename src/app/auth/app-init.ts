import { KeycloakService } from 'keycloak-angular';
import { environment } from '../../environments/environment';

/**
 * Initializer method for the keycloak-angular module.
 *
 * @param keycloak the KeycloakService that has to initialized
 */
export function initializer(keycloak: KeycloakService): () => Promise<any> {

  return (): Promise<any> => keycloak.init({
    config: {
      url: environment.settings.keycloak.config.url,
      realm: environment.settings.keycloak.config.realm,
      clientId: environment.settings.keycloak.config.clientId
    },
    initOptions: {
      checkLoginIframe: false
    },
    enableBearerInterceptor: environment.settings.keycloak.enableBearerInterceptor,
    bearerExcludedUrls: environment.settings.keycloak.bearerExcludedUrls
  });

}
