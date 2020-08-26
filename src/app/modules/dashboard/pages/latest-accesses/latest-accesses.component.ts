import { Component, OnInit } from '@angular/core';
import { AccessHistoryDto } from "../../models/accessHistoryDto";
import { HistoryService } from "../../services/history.service";
import { PopupService } from "../../../popup/popup.service";
import { Router } from "@angular/router";

/**
 * Controller for main page. This page is the container for many pages in modules/main/pages.
 */
@Component({
  selector: 'app-latest-accesses',
  templateUrl: './latest-accesses.component.html',
  styleUrls: ['./latest-accesses.component.scss']
})
export class LatestAccessesComponent implements OnInit {

  detections: AccessHistoryDto[];
  limit = "20";

  constructor(private historyService: HistoryService, private popupService: PopupService,
              private router: Router) {
  }

  ngOnInit() {
    const oneWeekAgo = new Date();
    this.historyService.getLatestAccesses(this.limit).subscribe(
      res => this.detections = res,
      error => {
        this.popupService
        .showError("Error retrieving latest week accesses", "Unexpected error")
        this.router.navigate(['/dashboard/start'])
      });
  }

  onLimitChange() {
    this.detections = [];
    this.historyService.getLatestAccesses(this.limit).subscribe(
      res => this.detections = res,
      error => {
        this.popupService
        .showError("Error retrieving latest week accesses", "Unexpected error")
        this.router.navigate(['/dashboard/start'])
      });
  }
}
