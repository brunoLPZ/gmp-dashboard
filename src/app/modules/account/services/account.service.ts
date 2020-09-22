import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Account } from "../models/account";
import { environment } from "../../../../environments/environment";
import { BlacklistDto } from "../../dashboard/models/blacklistDto";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly url: string = environment.settings.gmpServiceUrl;

  constructor(private readonly keycloakService: KeycloakService,
              private readonly httpClient: HttpClient) {
  }

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

  toggleNotifications(activate: boolean): Observable<any> {
    return this.httpClient.post(`${this.url}/user/notification`, {activate});
  }

}
