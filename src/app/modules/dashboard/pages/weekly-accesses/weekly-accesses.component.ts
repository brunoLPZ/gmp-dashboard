import { Component, OnInit } from '@angular/core';
import { AccessHistoryDto } from "../../models/accessHistoryDto";
import { HistoryService } from "../../services/history.service";

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

  constructor(private historyService: HistoryService) {
  }

  ngOnInit() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    this.historyService.getLatestAccesses(oneWeekAgo).subscribe(res => this.detections = res);
  }

}
