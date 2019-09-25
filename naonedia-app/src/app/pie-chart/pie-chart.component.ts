import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { DataService, Item } from '../service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['pie-chart.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PieChartComponent implements OnInit {

  @ViewChild('pie')
  chartContainer1: ElementRef;

  // Dimensions
  get height(): number {
    return parseInt(d3.select('body').style('height'), 10);
  }
  get width(): number {
    return parseInt(d3.select('body').style('width'), 10);
  }
  radius: number;

  percentage = 5;

  // Arcs & pie
  private arc: any;
  private hoveredArc: any;
  private arcLabel: any;
  private pie: any;
  private slices: any;

  private color: any;

  // Drawing containers
  private svg: any;
  private mainContainer: any;

  private texts: any;

  dataSource: Item[];
  total: number;

  constructor(private service: DataService) {
    const tmp = this.service.getData();


    this.dataSource = [
      {
        value: tmp.filter(values => values < this.percentage).length,
        name: `Inferior < ${this.percentage} %`
      },
      {
        value: tmp.filter(val => val >= this.percentage).length,
        name: `Superior < ${this.percentage} %`
      }
    ]

    this.total = this.dataSource.reduce((sum, it) => sum += it.value, 0);

    console.log(this.dataSource)
  }

  ngOnInit() {

    this.svg = d3.select('#pie').select('svg');
    this.initSvg();
  }

  private initSvg() {

    this.setSVGDimensions();

    // Color scale.
    //this.color = d3.scaleOrdinal(d3.schemeCategory10);
    this.color = ['#ffc107', '#dc3545']

    this.mainContainer = this.svg.append('g')
      .attr('transform', 'translate(' + this.radius + ',' + this.radius + ')');


    this.pie = d3.pie()
      .sort(null)
      .value((d: any) => d.value);

    this.draw();
    window.addEventListener('resize', this.resize.bind(this));
  }

  private setSVGDimensions() {

    this.radius = (Math.min(this.chartContainer1.nativeElement.offsetWidth, this.chartContainer1.nativeElement.offsetHeight)) / 2;

    this.svg
      .attr('width', this.radius * 2)
      .attr('height', this.radius * 2);
  }

  private draw() {
    this.setArcs();
    this.drawSlices();
    this.drawLabels();
  }

  private setArcs() {
    const thickness = .65;
    this.arc = d3.arc()
      .outerRadius(this.radius)
      .innerRadius(0)
      .innerRadius(this.radius * thickness);

    this.arcLabel = d3.arc()
      .innerRadius(this.radius * .8)
      .outerRadius(this.radius * .8);
  }

  private drawSlices() {
    var tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0.5);

    tooltip.append("rect")
      .attr("width", 30)
      .attr("height", 20)
      .attr("fill", "#ffffff")
      .style("opacity", 0.5);

    tooltip.append("div")
      .attr("x", 15)
      .attr("dy", "1.2em")
      .style("text-anchor", "middle")
      .attr("font-size", "1.5em")
      .attr("font-weight", "bold");

    this.slices = this.mainContainer.selectAll('path')
      .remove()
      .exit()
      .data(this.pie(this.dataSource))
      .enter().append('g')
      .append('path')
      .attr('d', this.arc);

    this.slices
      .attr('fill', 'transparent')
      .attr('fill', (d, i) => this.color[i])

      .on("mouseover", function () {
        tooltip.style("display", null);
      })
      .on("mousemove", function (d) {
        tooltip.transition().duration(200)
          .style("opacity", 0.9);
        tooltip.select("div").html(d.data.name + " <br><strong>" + d.data.value + "</strong>")
          .style("position", "fixed")
          .style("text-align", "center")
          .style("width", "120px")
          .style("height", "45px")
          .style("padding", "2px")
          .style("font", "12px sans-serif")
          .style("background", "lightsteelblue")
          .style("border", "0px")
          .style("border-radius", "8px")
          .style("left", (d3.event.pageX + 15) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
        d3.select(this.firstChild).transition()
          .attr("d", this.arc);

      })
      .on("mouseout", function () {
        tooltip.style("display", "none")
        d3.select(this.firstChild).transition()
          .attr("d", this.arcLabel)
          .attr("stroke", "none");
      })
  }

  private drawLabels() {
    this.texts = this.mainContainer.selectAll('text')
      .remove()
      .exit()
      .data(this.pie(this.dataSource))
      .enter().append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', d => `translate(${this.arcLabel.centroid(d)})`)
      .attr('dy', '0.35em');

    this.texts.append('tspan')
      .filter(d => (d.endAngle - d.startAngle) > 0.05)
      .attr('x', 0)
      .attr('y', 0)
      .style('font-weight', 'bold')
      .text(d => d.data.name);

    this.texts.append('tspan')
      .filter(d => (d.endAngle - d.startAngle) > 0.25)
      .attr('x', 0)
      .attr('y', '1.3em')
      .attr('fill-opacity', 0.7)
      .text(d => d.data.value.toLocaleString());
  }

  private resize() {
    this.setSVGDimensions();
    this.setArcs();
    this.repaint();
    this.drawLabels();
  }

  private repaint() {
    this.drawSlices();
    this.drawLabels();
  }
}