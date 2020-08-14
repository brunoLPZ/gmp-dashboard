import { Component, OnInit } from '@angular/core';
import { HistoryService } from "../../services/history.service";
import { AccessHistoryDto } from "../../models/accessHistoryDto";

/**
 * Controller for main page. This page is the container for many pages in modules/main/pages.
 */
@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  detections: AccessHistoryDto[];

  constructor(private historyService: HistoryService) { }

  ngOnInit() {
    this.historyService.getLatestAccesses().subscribe(res => this.detections = res);
  }

}
