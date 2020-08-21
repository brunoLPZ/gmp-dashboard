import { Component, OnInit } from '@angular/core';
import { AccountService } from "../../services/account.service";
import { Account } from "../../models/account";

/**
 * Controller for main page. This page is the container for many pages in modules/main/pages.
 */
@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {

  account: Account;

  constructor(private readonly accountService: AccountService) {}

  ngOnInit() {
    this.account = this.accountService.getAccount();
  }

}
