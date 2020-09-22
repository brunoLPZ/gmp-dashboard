import { Component, OnInit } from '@angular/core';
import { HistoryService } from "../../services/history.service";
import { PopupService } from "../../../popup/popup.service";
import { Router } from "@angular/router";
import { AccessHistoryDto } from "../../models/accessHistoryDto";
import { StatsService } from "../../services/stats.service";
import { GroupedAccessByDayDto } from "../../models/groupedAccessByDayDto";
import { GroupedAccessByMonthDto } from "../../models/groupedAccessByMonthDto";

/**
 * Controller for main page. This page is the container for many pages in modules/main/pages.
 */
@Component({
  selector: 'app-historical-accesses',
  templateUrl: './historical-accesses.component.html',
  styleUrls: ['./historical-accesses.component.scss']
})
export class HistoricalAccessesComponent implements OnInit {

  lastSevenDaysAccesses: GroupedAccessByDayDto[];
  yearAccesses: GroupedAccessByMonthDto[];
  itemAccesses: any[];
  width: number;
  height: number;
  currentYear: string;

  constructor(private historyService: HistoryService,
              private statsService: StatsService,
              private popupService: PopupService,
              private router: Router) {
  }

  ngOnInit() {
    this.currentYear = new Date().getFullYear().toString();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);
    this.statsService.getGroupedAccessesByDay(oneWeekAgo).subscribe(
      res => this.lastSevenDaysAccesses = res,
      error => {
        this.popupService
        .showError("Error retrieving latest week accesses", "Unexpected error")
        this.router.navigate(['/dashboard/start'])
      });
    const oneYearAgo = new Date(new Date().getFullYear(), 0, 1);
    this.statsService.getGroupedAccessesByMonth(oneYearAgo).subscribe(
      res => this.yearAccesses = res,
      error => {
        this.popupService
        .showError("Error retrieving year accesses", "Unexpected error")
        this.router.navigate(['/dashboard/start'])
      });
    this.statsService.getGroupedAccessesByItem(oneYearAgo).subscribe(
      res => this.itemAccesses = res,
      error => {
        this.popupService
        .showError("Error retrieving accesses by item", "Unexpected error")
        this.router.navigate(['/dashboard/start'])
      });
  }

  onResize(ev: any) {
    this.width = ev.contentRect.width;
    this.height = ev.contentRect.height;
  }
}
