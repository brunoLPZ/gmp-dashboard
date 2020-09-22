import {
  AfterViewInit,
  Component,
  ElementRef,
  Input, ViewChild,
  ViewEncapsulation
} from "@angular/core";
import { AccessHistoryDto } from "../../models/accessHistoryDto";
import { GraphService } from "../../services/graph.service";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PieChartComponent implements AfterViewInit {

  @ViewChild('chart') chart: ElementRef;
  @Input() data: any[];
  @Input() title: string;

  showGraph = true;

  constructor(private readonly graphService: GraphService) {
  }

  ngAfterViewInit() {
    const width = this.chart.nativeElement.offsetWidth;
    const height = this.chart.nativeElement.offsetHeight;

    this.showGraph = this.graphService.createPieChart(this.chart, this.data, this.title,
      width, height);
  }

  onResize(ev: any) {
    if (this.chart.nativeElement) {
      this.showGraph = this.graphService.createPieChart(this.chart, this.data, this.title,
        ev.contentRect.width, ev.contentRect.height);
    }
  }
}
