import { ElementRef, Injectable } from '@angular/core';
import * as d3 from 'd3';
import { AccessHistoryDto } from '../models/accessHistoryDto';

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
  public createLineChart(chart: ElementRef, data: AccessHistoryDto[], title: string,
                         width: number, height: number): boolean {

    // Remove old chart (handle resizing)
    this.removeOldChart(chart);

    // Extract all dates and ignore time
    const allDates = this.clearTimeFromDates(data);

    // Group accesses by same date
    const groupedAccesses = this.groupAccessesBy(data, allDates, 'time');
    // Extract accesses
    const accumulatedAccesses = groupedAccesses.map(access => access.accumulated);

    // If there's just accesses on a single day then don't show them
    if (groupedAccesses.length < 2) {
      return false;
    }
    // svg main container
    const svg = d3.select(chart.nativeElement).append('svg')
    .attr('width', width)
    .attr('height', height);

    // Scale for times
    const x = this.buildScaleTime(d3.extent(allDates),
      [this.margin.left, (width - this.margin.right)]);

    // x axis configuration (tick for every day)
    const xAxis = this.buildAxisX(x, d3.timeFormat('%d %b'), true);

    // draw x axis
    svg.append('g')
    .attr('class', 'xAxis')
    .attr('transform', `translate(0, ${(height - this.margin.bottom)})`)
    .call(xAxis);

    // Scale for accesses
    const y = this.buildScaleLinear([0, d3.max(accumulatedAccesses) + 1],
      [height - this.margin.bottom, this.margin.top])

    // y axis configuration (integer ticks)
    const yAxis = this.buildAxisY(y, d3.format('.0f'), d3.max(accumulatedAccesses));

    // draw y axis
    svg.append('g')
    .attr('class', 'yAxis')
    .attr('transform', `translate(${this.margin.left}, 0)`)
    .call(yAxis);

    // Add gridline
    this.drawGridLines(chart, width, height);

    // add line path for accesses
    svg.append('g').append('path')
    .datum(groupedAccesses)
    .attr('fill', 'none')
    .attr('stroke', this.PRIMARY_COLOR)
    .attr('stroke-width', 2.5)
    .attr('d', d3.line()
      .x(access => x(new Date(access.time)))
      .y(access => y(access.number))
    )

    // add circles for accesses
    svg.selectAll('access-point')
    .data(groupedAccesses)
    .enter()
    .append('circle')
    .attr('fill', this.PRIMARY_COLOR)
    .attr('stroke', 'none')
    .attr('cx', access => x(new Date(access.time)))
    .attr('cy', (access => y(access.number)))
    .attr('r', 4)

    // add line path for accumulated accesses
    svg.append('g').append('path')
    .datum(groupedAccesses)
    .attr('fill', 'none')
    .attr('stroke', this.SECONDARY_COLOR)
    .attr('stroke-width', 2.5)
    .attr('d', d3.line()
      .x(access => x(new Date(access.time)))
      .y(access => y(access.accumulated))
    )

    // add circles for accumulated accesses
    svg.selectAll('access-point')
    .data(groupedAccesses)
    .enter()
    .append('circle')
    .attr('fill', this.SECONDARY_COLOR)
    .attr('stroke', 'none')
    .attr('cx', access => x(new Date(access.time)))
    .attr('cy', (access => y(access.accumulated)))
    .attr('r', 4)

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
  public createBarChart(chart: ElementRef, data: AccessHistoryDto[], title: string,
                        width: number, height: number) {

    // Removes old chart (handling resizing)
    this.removeOldChart(chart);

    // Extract all dates and ignore time
    const allDates = this.clearTimeFromDates(data);

    // Group accesses by same date
    const groupedAccesses = this.groupAccessesBy(data, allDates, 'month');

    // If there's just accesses on a single month then don't show them
    if (groupedAccesses.length < 2) {
      return false;
    }

    // svg main container
    const svg = d3.select(chart.nativeElement).append('svg')
    .attr('width', width)
    .attr('height', height);

    // x scale for bars
    const x = d3.scaleBand()
    .range([this.margin.left, width - this.margin.right])
    .domain(groupedAccesses.map(access => access.month))
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
    .domain([0, d3.max(groupedAccesses.map(access => access.accumulated))]);

    // y axis configuration
    const yAxis = d3.axisLeft(y);

    // draw y axis
    svg.append('g')
    .attr('class', 'yAxis')
    .attr('transform', `translate(${this.margin.left}, 0)`)
    .call(yAxis);

    // Add gridline
    this.drawGridLines(chart, width, height);

    // Draw bars for accesses by month
    svg.selectAll()
    .data(groupedAccesses)
    .enter()
    .append('rect')
    .attr('x', access => x(access.month))
    .attr('y', access => y(access.number))
    .attr('height', access => height - this.margin.bottom - y(access.number))
    .attr('width', x.bandwidth() / 2)
    .attr('fill', this.PRIMARY_COLOR);

    // Draw bars for accumulated accesses next to accesses by month
    svg.selectAll()
    .data(groupedAccesses)
    .enter()
    .append('rect')
    .attr('x', access => x(access.month) + x.bandwidth() / 2)
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
  public createPieChart(chart: ElementRef, data: AccessHistoryDto[], title: string,
                        subtitle: string, width: number, height: number): boolean {

    // Remove old chart (handling resizes)
    this.removeOldChart(chart);

    // Define pie chart radius
    const radius = Math.min(width, height) / 2 - this.margin.bottom;

    // svg main container
    const svg = d3.select(chart.nativeElement).append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`);

    // Get grouped accesses by website
    const groupedAccesses = this.groupAccessesBy(data, [], 'blacklist');

    // If there's no accesses then don't display the chart
    if (groupedAccesses.length === 0) {
      return false;
    }

    // Color scale to use different colors for each website
    const color = d3.scaleOrdinal()
    .domain(Object.keys(groupedAccesses))
    .range(this.COLORS)

    // Pie chart configuration to add angles to input data
    const pie = d3.pie()
    .value(d => d.value);
    const data_ready = pie(d3.entries(groupedAccesses))

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

      // Remove previous information
      svg.selectAll('.pie-tooltip').remove();

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
      .attr('y', 20)
      .attr('class', 'pie-tooltip-number-text')
    });

    // add title
    svg.append('text')
    .attr('x', -(width / 2) + this.margin.left)
    .attr('y', -(height / 2) + 40)
    .text(title)
    .attr('class', 'title');

    svg.append('text')
    .attr('x', -(width / 2) + this.margin.left)
    .attr('y', -(height / 2) + 70)
    .text(subtitle)
    .style('font-size', '14px');

    return true;
  }

  /**
   * Removes previous chart if present
   * @param chart chart container
   * @private
   */
  private removeOldChart(chart: ElementRef) {
    const children = chart.nativeElement.children;
    if (children.length === 0) {
      return;
    }
    let child;
    child = children[children.length === 1 ? 0 : 1];
    if (child) {
      d3.select(child).remove();
    }
  }

  /**
   * Clears time precision from dates to better display on charts
   * @param data input data
   * @private
   */
  private clearTimeFromDates(data: AccessHistoryDto[]): Date[] {
    return data.map(d => {
      const date = new Date(d.createdDate)
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      return date;
    })
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
   * Extract accesses grouped by specified parameter
   * @param data input data
   * @param dates dates to be used if needed
   * @param option parameter to group by
   * @private
   */
  private groupAccessesBy(data: AccessHistoryDto[], dates: Date[], option) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
      'Nov', 'Dec'];

    let accesses;

    switch (option) {
      case 'time':
        accesses = [];
        dates.forEach(d => {
          if (!accesses.find(access => access[option] === d.getTime())) {
            accesses.push({
              time: d.getTime(),
              number: data.filter(access => this.isSameDay(new Date(access.createdDate), d)).length
            })
          }
        });
        break;
      case 'month':
        accesses = [];
        dates.forEach(d => {
          if (!accesses.find(access => access[option] === monthNames[d.getMonth()])) {
            accesses.push({
              month: monthNames[d.getMonth()],
              monthId: d.getMonth(),
              number: data.filter(access => this.isSameMonth(new Date(access.createdDate), d)).length
            })
          }
        });
        option = 'monthId';
        break;
      case 'blacklist':
        accesses = {};
        data.forEach(d => {
          if (accesses[d.blacklist.domain] == null) {
            accesses[d.blacklist.domain] = 1;
          } else {
            accesses[d.blacklist.domain] += 1;
          }
        });
        return accesses;
    }


    accesses.sort((a, b) => a[option] - b[option]);

    accesses.forEach((access, index) => {
      if (index === 0) {
        access['accumulated'] = access.number;
      } else {
        access['accumulated'] = access.number + accesses[index - 1].accumulated;
      }
    });

    return accesses;
  }

  /**
   * Determine if dates belong to same month
   * @param first first date
   * @param second second date
   * @private
   */
  private isSameMonth(first: Date, second: Date) {
    return first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth();
  }

  /**
   * Determine if dates are in same day
   * @param first first date
   * @param second second date
   * @private
   */
  private isSameDay(first: Date, second: Date) {
    return first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDay() === second.getDay();
  }

}
