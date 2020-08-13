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
    return super.canActivate(route, state);
  }

  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (!this.authenticated) {
        this.keycloakAngular.login();
        return;
      }

      console.log('role restriction given at app-routing.module for this route', route.data.roles);
      const requiredRoles = route.data.roles;
      let granted: boolean;
      granted = false;
      if (!requiredRoles || requiredRoles.length === 0) {
        granted = true;
      } else {
        for (const requiredRole of requiredRoles) {
          if (this.roles.indexOf(requiredRole) > -1) {
            granted = true;
            break;
          }
        }
      }

      if (granted === false) {
        this.router.navigate(['/']);
      }
      resolve(granted);
    });
  }
}
