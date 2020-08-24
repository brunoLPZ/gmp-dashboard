import { Component, OnInit } from '@angular/core';
import { AccessHistoryDto } from "../../models/accessHistoryDto";
import { HistoryService } from "../../services/history.service";
import { PopupService } from "../../../popup/popup.service";
import { Router } from "@angular/router";

/**
 * Controller for main page. This page is the container for many pages in modules/main/pages.
 */
@Component({
  selector: 'app-weekly-accesses',
  templateUrl: './weekly-accesses.component.html',
  styleUrls: ['./weekly-accesses.component.scss']
})
export class WeeklyAccessComponent implements OnInit {

  detections: AccessHistoryDto[];

  constructor(private historyService: HistoryService, private popupService: PopupService,
              private router: Router) {
  }

  ngOnInit() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.historyService.getLatestAccesses(oneWeekAgo, tomorrow).subscribe(
      res => this.detections = res,
      error => {
        this.popupService
        .showError("Error retrieving latest week accesses", "Unexpected error")
        this.router.navigate(['/dashboard/start'])
      });
  }

}
