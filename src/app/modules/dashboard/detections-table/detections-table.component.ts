import { Component, Input } from '@angular/core';
import { AccessHistoryDto } from "../models/accessHistoryDto";

/**
 * Controller for main page. This page is the container for many pages in modules/main/pages.
 */
@Component({
  selector: 'app-detections-table',
  templateUrl: './detections-table.component.html',
  styleUrls: ['./detections-table.component.scss']
})
export class DetectionsTableComponent {

  @Input() detections: AccessHistoryDto[];
  displayedColumns: string[] = [
    'blacklist.domain',
    'blacklist.ip',
    'falsePositive',
    'deposit',
    'createdDate'
  ];

  constructor() {
  }
}
