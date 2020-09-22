import { Component, OnInit } from '@angular/core';
import { AccountService } from "../../services/account.service";
import { Account } from "../../models/account";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { PopupService } from "../../../popup/popup.service";

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

  constructor(private readonly accountService: AccountService,
              private readonly popupService: PopupService) {
  }

  ngOnInit() {
    this.account = this.accountService.getAccount();
  }

  onToggleNotifications($event: MatSlideToggleChange) {
    this.accountService.toggleNotifications($event.checked).subscribe(
      res => {
        const notificationStatus = $event.checked ? "enabled" : "disabled";
        this.popupService.showSuccess(`Notifications are now ${notificationStatus}`,
          "Notifications changed");
      },
      error => {
        this.account.notification = !$event.checked;
        this.popupService.showError("There was an error changing notifications",
          "Error changing notifications")
      }
    )
  }
}
