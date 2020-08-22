import { Component, OnInit } from '@angular/core';
import { HistoryService } from "../../services/history.service";
import { PopupService } from "../../../popup/popup.service";
import { Router } from "@angular/router";

/**
 * Controller for main page. This page is the container for many pages in modules/main/pages.
 */
@Component({
  selector: 'app-historical-accesses',
  templateUrl: './historical-accesses.component.html',
  styleUrls: ['./historical-accesses.component.scss']
})
export class HistoricalAccessesComponent implements OnInit {

  constructor(private historyService: HistoryService, private popupService: PopupService,
              private router: Router) {
  }

  ngOnInit() {
  }

}
