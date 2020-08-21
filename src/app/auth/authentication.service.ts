import {Injectable} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private readonly keycloakService: KeycloakService) {}

  public logout() {
    const getUrl = window.location;
    const baseUrl = `${getUrl.protocol}//${getUrl.host}/gmp`;
    this.keycloakService.clearToken();
    this.keycloakService.logout(baseUrl);
  }

}
