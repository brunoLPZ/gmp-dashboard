import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BlacklistService } from "../../services/blacklist.service";
import { BlacklistDto } from "../../../dashboard/models/blacklistDto";
import { PopupService } from "../../../popup/popup.service";

/**
 * Controller for main page. This page is the container for many pages in modules/main/pages.
 */
@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.component.html',
  styleUrls: ['./suggest.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SuggestComponent {

  formGroup: FormGroup;

  constructor(private blacklistService: BlacklistService, private popupService: PopupService) {
    this.formGroup = new FormGroup({
      domain: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/)
      ]),
      ip: new FormControl('', [
        Validators.pattern(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)
      ])
    })
  }


  submitForm() {
    if (this.formGroup.valid) {
      const blacklistItem = new BlacklistDto();
      blacklistItem.domain = this.formGroup.get('domain').value;
      if (this.formGroup.get('ip').value) {
        blacklistItem.ip = this.formGroup.get('ip').value;
      }
      this.blacklistService.createBlacklistItem(blacklistItem).subscribe(
        res => this.popupService.showSuccess(
          `Website with domain ${blacklistItem.domain} registered successfully`,
          "Register success"),
        error => this.popupService.showError(
          `Error registering website with domain ${blacklistItem.domain}`,
          "Registration error")
      )
    } else {
      this.formGroup.get('domain').markAsTouched()
      this.formGroup.get('ip').markAsTouched()
    }
  }
}
