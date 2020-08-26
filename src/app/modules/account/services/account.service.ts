import {Injectable} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import { Account } from "../models/account";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private readonly keycloakService: KeycloakService) {}

  getAccount(): Account {
    const tokenParsed = this.keycloakService.getKeycloakInstance().tokenParsed;
    const account = new Account();
    account.email = tokenParsed['email'];
    account.firstName = tokenParsed['given_name'];
    account.lastName = tokenParsed['family_name'];
    account.userName = tokenParsed['preferred_username'];
    account.notification = tokenParsed['notification'];
    return account;
  }
}
