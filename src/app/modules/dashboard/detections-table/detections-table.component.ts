import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AccessHistoryDto } from "../models/accessHistoryDto";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

/**
 * Controller for main page. This page is the container for many pages in modules/main/pages.
 */
@Component({
  selector: 'app-detections-table',
  templateUrl: './detections-table.component.html',
  styleUrls: ['./detections-table.component.scss']
})
export class DetectionsTableComponent implements OnInit {

  @Input() detections: AccessHistoryDto[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource;
  displayedColumns: string[] = [
    'blacklist.domain',
    'blacklist.ip',
    'falsePositive',
    'deposit',
    'createdDate'
  ];

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.detections);
    this.dataSource.paginator = this.paginator;
  }

  constructor() {
  }
}
