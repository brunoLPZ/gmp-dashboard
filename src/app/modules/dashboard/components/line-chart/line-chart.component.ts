import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import * as d3 from 'd3';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements AfterViewInit {

  @ViewChild('chart') chart: ElementRef;

  ngAfterViewInit() {
    const svg = d3.select(this.chart.nativeElement).append('svg')
      .attr('width', '100%')
      .attr('height', '400px');

  }
}
