import {KeycloakAuthGuard, KeycloakService} from 'keycloak-angular';
import {Injectable, isDevMode} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';

/**
 * Generic authguard that helps to bootstrap your security configuration and avoid duplicate code.
 * This class already checks if the user is logged in and gets the list of roles from the authenticated
 * user, provided by the keycloak instance.
 */
@Injectable()
export class AppAuthGuard extends KeycloakAuthGuard {
  constructor(
    protected router: Router,
    protected keycloakAngular: KeycloakService
  ) {
    super(router, keycloakAngular);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    if (isDevMode()) {
      console.log('AppAuthGuard#canActivate called.');
    }
    console.log(state);
    return super.canActivate(route, state);
  }

  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (!this.authenticated) {
        // check for loginHint in secured url
        const keycloakLoginOptions: Keycloak.KeycloakLoginOptions = {};
        if (route.queryParams.loginHint) {
          keycloakLoginOptions.loginHint = route.queryParams.loginHint;
        }

        this.keycloakAngular.login(keycloakLoginOptions);
        // access not allowed
        resolve(false);
      }

      // enable role specific routing in data.roles[]
      const requiredRoles = route.data.roles;
      if (!requiredRoles || requiredRoles.length === 0) {
        return resolve(true);
      }
      if (!this.roles || this.roles.length === 0) {
        resolve(false);
      }
      const granted = requiredRoles.some(r => this.roles.includes(r));
      resolve(granted);
    });
  }
}
