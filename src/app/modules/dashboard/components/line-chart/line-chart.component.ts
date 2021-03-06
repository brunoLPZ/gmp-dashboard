import {
  AfterViewInit,
  Component,
  ElementRef,
  Input, ViewChild,
  ViewEncapsulation
} from "@angular/core";
import { GraphService } from "../../services/graph.service";
import { GroupedAccessByDayDto } from "../../models/groupedAccessByDayDto";

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LineChartComponent implements AfterViewInit {

  @ViewChild('chart') chart: ElementRef;
  @Input() data: GroupedAccessByDayDto[];
  @Input() title: string;

  showGraph = true;

  constructor(private readonly graphService: GraphService) {
  }

  ngAfterViewInit() {
    const width = this.chart.nativeElement.offsetWidth;
    const height = this.chart.nativeElement.offsetHeight;

    this.showGraph = this.graphService.createLineChart(this.chart, this.data, this.title,
      width, height);
  }

  onResize(ev: any) {
    if (this.chart.nativeElement) {
      this.showGraph = this.graphService.createLineChart(this.chart, this.data, this.title,
        ev.contentRect.width, ev.contentRect.height);
    }
  }

}
