import { Component, OnInit } from '@angular/core';
import { HistoryService } from "../../services/history.service";
import { PopupService } from "../../../popup/popup.service";
import { Router } from "@angular/router";
import { AccessHistoryDto } from "../../models/accessHistoryDto";

/**
 * Controller for main page. This page is the container for many pages in modules/main/pages.
 */
@Component({
  selector: 'app-historical-accesses',
  templateUrl: './historical-accesses.component.html',
  styleUrls: ['./historical-accesses.component.scss']
})
export class HistoricalAccessesComponent implements OnInit {

  lastSevenDaysAccesses: AccessHistoryDto[];
  yearAccesses: AccessHistoryDto[];
  width: number;
  height: number;

  constructor(private historyService: HistoryService, private popupService: PopupService,
              private router: Router) {
  }

  ngOnInit() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.historyService.getLatestAccesses(oneWeekAgo, tomorrow).subscribe(
      res => this.lastSevenDaysAccesses = res,
      error => {
        this.popupService
        .showError("Error retrieving latest week accesses", "Unexpected error")
        this.router.navigate(['/dashboard/start'])
      });
    const oneYearAgo = new Date(new Date().getFullYear(), 0, 1);
    this.historyService.getLatestAccesses(oneYearAgo, tomorrow).subscribe(
      res => this.yearAccesses = res,
      error => {
        this.popupService
        .showError("Error retrieving year accesses", "Unexpected error")
        this.router.navigate(['/dashboard/start'])
      });
  }

  onResize(ev: any) {
    this.width = ev.contentRect.width;
    this.height = ev.contentRect.height;
  }
}
