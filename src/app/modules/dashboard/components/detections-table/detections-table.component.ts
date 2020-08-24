import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { AccessHistoryDto } from "../../models/accessHistoryDto";

/**
 * Controller for main page. This page is the container for many pages in modules/main/pages.
 */
@Component({
  selector: 'app-detections-table',
  templateUrl: './detections-table.component.html',
  styleUrls: ['./detections-table.component.scss']
})
export class DetectionsTableComponent implements OnInit, AfterViewInit {

  @Input() detections: AccessHistoryDto[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

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
    this.dataSource.sortingDataAccessor = (item, property) => {
      const propertyParts = property.split('.');
      if (propertyParts.length == 1) {
        return item[property];
      }
      return item[propertyParts[0]][propertyParts[1]];
    };
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  constructor() {
  }
}
