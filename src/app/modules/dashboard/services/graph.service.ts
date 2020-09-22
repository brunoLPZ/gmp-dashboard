import { ElementRef, Injectable } from '@angular/core';
import * as d3 from 'd3';
import { GroupedAccessByDayDto } from "../models/groupedAccessByDayDto";
import { GroupedAccessByMonthDto } from "../models/groupedAccessByMonthDto";

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  PRIMARY_COLOR = '#a5d6a7';
  SECONDARY_COLOR = '#d1c4e9';
  COLORS = ['#9accb3', '#9ac0cc', '#d1c4e9', '#ef9a9a', '#90caf9', '#ffcc80', '#ffab91', '#bcaaa4',
    '#eeeeee', '#b0bec5', '#adffff', '#d9ff9e'];

  margin = {top: 90, bottom: 60, left: 30, right: 30};

  /**
   * Creates a line chart graph for daily accesses
   * @param chart element ref to place chart
   * @param data data to draw
   * @param title chart title
   * @param width chart width
   * @param height chart height
   */
  public createLineChart(chart: ElementRef, data: GroupedAccessByDayDto[], title: string,
                         width: number, height: number): boolean {

    // Remove old chart (handle resizing)
    this.removeOldChart(chart);

    // If there's just accesses on a single day then don't show them
    if (data.length < 2) {
      return false;
    }
    // svg main container
    const svg = d3.select(chart.nativeElement).append('svg')
    .attr('width', width)
    .attr('height', height);

    // Scale for times
    const x = this.buildScaleTime(d3.extent(data.map(d => this.createDateWithoutTime(d.day))),
      [this.margin.left, (width - this.margin.right)]);

    // x axis configuration (tick for every day)
    const xAxis = this.buildAxisX(x, d3.timeFormat('%d %b'), true);

    // draw x axis
    svg.append('g')
    .attr('class', 'xAxis')
    .attr('transform', `translate(0, ${(height - this.margin.bottom)})`)
    .call(xAxis);

    // Scale for accesses
    const y = this.buildScaleLinear([0, d3.max(data.map(d => d.accumulated)) + 1],
      [height - this.margin.bottom, this.margin.top])

    // y axis configuration (integer ticks)
    const yAxis = this.buildAxisY(y, d3.format('.0f'),
      d3.min([d3.max(data.map(d => d.accumulated)), 8]));

    // draw y axis
    svg.append('g')
    .attr('class', 'yAxis')
    .attr('transform', `translate(${this.margin.left}, 0)`)
    .call(yAxis);

    // Add gridline
    this.drawGridLines(chart, width, height);

    // add line path for accesses
    svg.append('g').append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', this.PRIMARY_COLOR)
    .attr('stroke-width', 2.5)
    .attr('d', d3.line()
      .x(access => x(this.createDateWithoutTime(access.day)))
      .y(access => y(access.accesses))
    )

    // add circles for accesses
    svg.selectAll('access-point')
    .data(data)
    .enter()
    .append('circle')
    .attr('fill', this.PRIMARY_COLOR)
    .attr('stroke', 'none')
    .attr('cx', access => x(this.createDateWithoutTime(access.day)))
    .attr('cy', (access => y(access.accesses)))
    .attr('r', 6)

    // add line path for accumulated accesses
    svg.append('g').append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', this.SECONDARY_COLOR)
    .attr('stroke-width', 2.5)
    .attr('d', d3.line()
      .x(access => x(this.createDateWithoutTime(access.day)))
      .y(access => y(access.accumulated))
    )

    // add circles for accumulated accesses
    svg.selectAll('access-point')
    .data(data)
    .enter()
    .append('circle')
    .attr('fill', this.SECONDARY_COLOR)
    .attr('stroke', 'none')
    .attr('cx', access => x(this.createDateWithoutTime(access.day)))
    .attr('cy', (access => y(access.accumulated)))
    .attr('r', 6)

    // Rotate x labels to be vertical and win space
    this.rotateAxisLabels(chart);

    // add legends
    this.addLegendsAndTitle(svg, width, title, ['accesses', 'total'], [this.PRIMARY_COLOR, this.SECONDARY_COLOR]);

    return true;
  }

  /**
   * Creates a bar chart for accesses by month
   * @param chart element ref to place chart
   * @param data data to draw
   * @param title chart title
   * @param width chart width
   * @param height chart height
   */
  public createBarChart(chart: ElementRef, data: GroupedAccessByMonthDto[], title: string,
                        width: number, height: number) {

    // Removes old chart (handling resizing)
    this.removeOldChart(chart);

    // If there's just accesses on a single month then don't show them
    if (data.length < 2) {
      return false;
    }

    // svg main container
    const svg = d3.select(chart.nativeElement).append('svg')
    .attr('width', width)
    .attr('height', height);

    // x scale for bars
    const x = d3.scaleBand()
    .range([this.margin.left, width - this.margin.right])
    .domain(data.map(access => access.month))
    .padding(0.05)

    // x axis configuration
    const xAxis = d3.axisBottom(x);

    // draw x axis
    svg.append('g')
    .attr('class', 'xAxis')
    .attr('transform', `translate(0, ${(height - this.margin.bottom)})`)
    .call(xAxis);

    // y scale for bars
    const y = d3.scaleLinear()
    .range([height - this.margin.bottom, this.margin.top])
    .domain([0, d3.max(data.map(access => access.accumulated))]);

    // y axis configuration
    const yAxis = d3.axisLeft(y).ticks(d3.min([d3.max(data.map(d => d.accumulated)), 8]));

    // draw y axis
    svg.append('g')
    .attr('class', 'yAxis')
    .attr('transform', `translate(${this.margin.left}, 0)`)
    .call(yAxis);

    // Add gridline
    this.drawGridLines(chart, width, height);

    // Draw bars for accesses by month
    svg.selectAll()
    .data(data)
    .enter()
    .append('rect')
    .attr('x', access => x(access.month) - 2)
    .attr('y', access => y(access.accesses))
    .attr('height', access => height - this.margin.bottom - y(access.accesses))
    .attr('width', x.bandwidth() / 2)
    .attr('fill', this.PRIMARY_COLOR);

    // Draw bars for accumulated accesses next to accesses by month
    svg.selectAll()
    .data(data)
    .enter()
    .append('rect')
    .attr('x', access => x(access.month) + x.bandwidth() / 2 + 2)
    .attr('y', access => y(access.accumulated))
    .attr('height', access => height - this.margin.bottom - y(access.accumulated))
    .attr('width', x.bandwidth() / 2)
    .attr('fill', this.SECONDARY_COLOR);

    // Rotate x labels to win space
    this.rotateAxisLabels(chart);

    // add legends
    this.addLegendsAndTitle(svg, width, title, ['accesses', 'total'], [this.PRIMARY_COLOR, this.SECONDARY_COLOR]);

    return true;
  }

  /**
   * Creates a pie chart for accesses by website
   * @param chart element ref to place chart
   * @param data data to draw
   * @param title chart title
   * @param subtitle chart subtitle
   * @param width chart width
   * @param height chart height
   */
  public createPieChart(chart: ElementRef, data: any[], title: string, width: number,
                        height: number): boolean {

    // Remove old chart (handling resizes)
    this.removeOldChart(chart);

    // If there's no accesses then don't display the chart
    if (Object.keys(data).length === 0) {
      return false;
    }

    // Define pie chart radius
    const radius = Math.min(width, height) / 2 - this.margin.bottom;

    // svg main container
    const svg = d3.select(chart.nativeElement).append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`);


    // Color scale to use different colors for each website
    const color = d3.scaleOrdinal()
    .domain(Object.keys(data))
    .range(this.COLORS)

    // Pie chart configuration to add angles to input data
    const pie = d3.pie()
    .value(d => d.value);
    const data_ready = pie(d3.entries(data))

    // Create an arch generator
    const arcGenerator = d3.arc()
    .innerRadius(50)
    .outerRadius(radius)

    // Draw arcs using prepared data
    svg
    .selectAll('slice')
    .data(data_ready)
    .enter()
    .append('path')
    .attr('d', arcGenerator)
    .attr('fill', d => color(d.data.key))
    .attr('stroke', 'white')
    .attr('stroke-width', '2px')
    .attr('id', d => d.data.key)
    .attr('class', 'pie-slice')
    // Add on click action to show more information for each slice
    .on('click', (d, i) => {
      this.selectPieChartSlice(svg, d, i, height, color);
    });

    // Select first slice by default
    this.selectPieChartSlice(svg, data_ready[0], 0, height, color);

    // add title
    svg.append('text')
    .attr('x', -(width / 2) + this.margin.left)
    .attr('y', -(height / 2) + 40)
    .text(title)
    .attr('class', 'title');

    return true;
  }

  /**
   * Removes previous chart if present
   * @param chart chart container
   * @private
   */
  private removeOldChart(chart: ElementRef) {
    const child = chart.nativeElement.querySelector('svg');
    if (child) {
      d3.select(child).remove();
    }
  }

  /**
   * Builds a time scale
   * @param domain domain to be used
   * @param range range of output values
   * @private
   */
  private buildScaleTime(domain, range) {
    return d3.scaleTime()
    .domain(domain).range(range);
  }

  /**
   * Builds a linear scale
   * @param domain domain to be used
   * @param range range of output values
   * @private
   */
  private buildScaleLinear(domain, range) {
    return d3.scaleTime()
    .domain(domain).range(range);
  }

  /**
   * Builds a x axis using time scales with given parameters
   * @param scaleX time scale to be used
   * @param ticksFormat ticks format
   * @param ticksEveryDay if ticks should be added for every day
   * @param ticks number of ticks
   * @private
   */
  private buildAxisX(scaleX, ticksFormat, ticksEveryDay?, ticks?) {
    if (ticksEveryDay) {
      return d3.axisBottom(scaleX)
      .ticks(d3.timeDay, 1)
      .tickFormat(ticksFormat)
    } else {
      return d3.axisBottom(scaleX)
      .ticks(ticks)
      .tickFormat(ticksFormat);
    }
  }

  /**
   * Builds an y axis using the provided scale
   * @param scaleY scale to be used
   * @param tickFormat tick format
   * @param ticks number of ticks
   * @private
   */
  private buildAxisY(scaleY, tickFormat, ticks?) {
    return d3.axisLeft(scaleY)
    .ticks(ticks)
    .tickFormat(tickFormat)
  }

  /**
   * Draws grid lines for a chart
   * @param chart chart where draw grid lines
   * @param width chart width
   * @param height chart height
   * @private
   */
  private drawGridLines(chart: ElementRef, width: number, height: number) {
    chart.nativeElement.querySelectorAll('.yAxis g.tick').forEach(tick => {
      d3.select(tick)
      .append('line')
      .attr('class', 'gridline')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', (width - this.margin.left - this.margin.right))
      .attr('y2', 0);
    })

    chart.nativeElement.querySelectorAll('.xAxis g.tick').forEach(tick => {
      d3.select(tick)
      .append('line')
      .attr('class', 'gridline')
      .attr('x1', 0)
      .attr('y1', -(height - this.margin.top - this.margin.bottom))
      .attr('x2', 0)
      .attr('y2', 0);
    })

  }

  /**
   * Adds legends and title to a chart
   * @param svg svg element where chart is placed
   * @param width chart width
   * @param title chart title
   * @param labels labels to be added
   * @param colors colors to use for each label
   * @private
   */
  private addLegendsAndTitle(svg: any, width: number, title: string, labels: string[], colors: string[]) {
    const xLabel = width - (this.margin.left * 4)
    const yLabel = 45;

    let separator = 0;

    labels.forEach((label, index) => {
      svg.append('circle')
      .attr('cx', xLabel)
      .attr('cy', yLabel + separator)
      .attr('r', 6)
      .style('fill', colors[index])
      svg.append('text')
      .attr('x', xLabel + 10)
      .attr('y', yLabel + separator)
      .text(label)
      .attr('class', 'legend');
      separator += 20;
    });

    // add title
    svg.append('text')
    .attr('x', this.margin.left)
    .attr('y', 25)
    .text(title)
    .attr('class', 'title');

  }

  /**
   * Rotate labels to be vertical
   * @param chart chart where labels are placed
   * @private
   */
  private rotateAxisLabels(chart: ElementRef) {
    chart.nativeElement.querySelectorAll('.xAxis text').forEach(text => {
      d3.select(text)
      .attr('transform', 'rotate(90) translate(30, -15)')
    })
  }

  /**
   * Clears time precision from dates to better display on charts
   * @param data input data
   * @private
   */
  private createDateWithoutTime(date: string) {
    const dateWithoutTime = new Date(date);
    dateWithoutTime.setHours(0);
    dateWithoutTime.setMinutes(0);
    dateWithoutTime.setSeconds(0);
    return dateWithoutTime;
  }

  private selectPieChartSlice(svg: any, d: any, i: number, height: number, color: any) {

    // Remove previous information
    svg.selectAll('.pie-tooltip').remove();

    svg.select('.pie-slice.selected').attr('class', 'pie-slice');
    svg.selectAll('.pie-slice').filter((d, index) => index === i).attr('class', 'pie-slice selected');

    // Create group for information
    const g = svg
    .append('g')
    .attr('class', 'pie-tooltip');

    // Add text to show selected website and number of accesses
    g.append('text')
    .text(d.data.key)
    .attr('y', (height / 2) - this.margin.bottom + 30)
    .attr('class', 'pie-tooltip-key-text')
    g.append('text')
    .text(d.data.value)
    .attr('fill', color(d.data.key))
    .attr('y', 20)
    .attr('class', 'pie-tooltip-number-text')
  }

}
