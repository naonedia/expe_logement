import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Axis, AxisDomain } from 'd3';
import * as d3 from 'd3';
import { DataService, Item } from '../service/data.service';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['line-chart.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LineChartComponent implements OnInit {
  @ViewChild('line')
  chartContainer1: ElementRef;

  private margin = { top: 20, right: 20, bottom: 20, left: 20 };

  get height(): number {
    return parseInt(d3.select('body').style('height'), 10);
  }
  get width(): number {
    return parseInt(d3.select('body').style('width'), 10);
  }

  // group containers
  private gx: any; // X axis
  private gy: any; // Y axis
  private line: d3.Line<[number, number]>; // Line
  private labels: any; // Labels

  // Scales and Axis
  private xAxis: Axis<AxisDomain>;
  private xScale: any;
  private yAxis: Axis<AxisDomain>;
  private yScale: any;
  private tooltip: any;

  // Drawing containers
  private svg: any;
  private mainContainer: any;

  dataSource: any[];
  total: number;
  percentage = 5;

  constructor(private service: DataService) {
    const tmp = this.service.getData();

    this.dataSource = tmp.map((val, index) => { return { value: val, epochs: index } });


    this.total = this.dataSource.reduce((sum, it) => sum += it, 0);

  }

  ngOnInit() {
    this.svg = d3.select('#line').select('svg');

    this.tooltip = d3.select('#line')
      .append('div')
      .style('opacity', 0)
      .attr('class', 'tooltip')
    this.initSvg();
  }

  private initSvg() {
    this.setSVGDimensions();
    this.mainContainer = this.svg.append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    this.gy = this.mainContainer.append('g')
      .attr('class', 'axis axis--y');

    this.gx = this.mainContainer.append('g')
      .attr('class', 'axis axis--x');

    this.draw();
    window.addEventListener('resize', this.resize.bind(this));
  }

  private drawLine() {
    var thisXScale = this.xScale;
    var thisYScale = this.yScale;

    this.line = d3.line()
      .x(function (d: any) { return thisXScale(d.epochs) })
      .y(function (d: any) { return thisYScale(d.value); });

    this.mainContainer.select('.line')
      .remove()

    this.mainContainer.append('path')
      .datum(this.dataSource)
      .attr('class', 'line')
      .attr("stroke-width", 1)
      .attr("fill", "none")
      .attr('d', this.line)
  }

  private drawAxis() {
    this.gy.attr('transform', `translate(0, 0)`).call(this.yAxis);
    this.gx.attr('transform', `translate(0, ${this.yScale(0)})`).call(this.xAxis);
  }

  private setSVGDimensions() {
    this.svg
      .style('width', this.chartContainer1.nativeElement.offsetWidth)
      .style('height', this.chartContainer1.nativeElement.offsetHeight);
  }

  private setAxisScales() {
    this.xScale = d3.scaleLinear();
    this.yScale = d3.scaleLinear();

    this.xScale
      .range([0, this.chartContainer1.nativeElement.offsetWidth - this.margin.left - this.margin.right])
      .domain(d3.extent(this.dataSource, (d) => d.epochs));

    this.yScale
      .range([this.chartContainer1.nativeElement.offsetHeight - this.margin.top - this.margin.bottom, 0])
      //.domain(d3.extent(this.dataSource, (d) => d.value))
      .domain([0, Math.max(...this.dataSource.map(x => x.value))]);
    this.xAxis = d3.axisBottom(this.xScale);
    this.yAxis = d3.axisLeft(this.yScale);

  }

  private draw() {
    this.setAxisScales();
    this.drawAxis();
    this.drawLine();
    this.drawLabels();
  }

  resize() {
    this.setSVGDimensions();
    this.setAxisScales();
    this.repaint();
  }

  private repaint() {
    this.drawAxis();
    this.drawLine();
    this.drawLabels();
  }

  private drawLabels() {
    const thisTooltip = this.tooltip;

    this.labels = this.mainContainer.selectAll('.dot')
      .data(this.dataSource)
      .enter().append('circle')
      .attr("r", 5)
      .attr("class", "myCircle")
      .on('mouseover', function (data, i, arr) {
        thisTooltip
          .style('top', (d3.event.layerY + 15) + 'px')
          .style('left', (d3.event.layerX) + 'px')
          .style('display', 'block')
          .style('opacity', 1)
          .style('height', '40px')
          .html('value: ' + data.value + '<br>' +
            'epochs: ' + data.epochs + '<br>');

      })
      .on('mouseout', function (data, i, arr) {
        thisTooltip.style('display', 'none');
        thisTooltip.style('opacity', 0);

      })

      .transition()
      .duration(1500)
      .delay((d, i) => 1000 + i * 100)
      .attr('cx', d => this.xScale(d.epochs))
      .attr('cy', d => this.yScale(d.value))
      .attr('x', d => d.epochs)
      .attr('y', d => d.value)





  }
}