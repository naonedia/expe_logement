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

  radius: number;

  percentage = 50;
  thickness = .65;

  // Arcs & pie
  private arc: any;
  private circleText: any;
  private circleTitle: any;
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
        name: `Inferior to ${this.percentage} %`
      },
      {
        value: tmp.filter(val => val >= this.percentage).length,
        name: `Superior to ${this.percentage} %`
      }
    ]

    this.total = this.dataSource.reduce((sum, it) => sum += it.value, 0);
  }

  ngOnInit() {
    this.svg = d3.select('#pie').select('svg');
    this.initSvg();
  }

  private initSvg() {

    this.radius = (Math.min(this.chartContainer1.nativeElement.offsetWidth, this.chartContainer1.nativeElement.offsetHeight)) / 2;

    this.setSVGDimensions();

    var tmp = this.mainContainer.append('g');

    tmp = tmp.append('text')
      .attr('class', 'label')
      .attr("text-anchor", "middle")
      .style('font-weight', 'bold');

    this.circleTitle = tmp.append('tspan')
      //.filter(d => (d.endAngle - d.startAngle) > 0.05)
      .attr('x', 0)
      .attr('y', 0)
      .style('font-weight', 'bold')

    this.circleText = tmp.append('tspan')
      //filter(d => (d.endAngle - d.startAngle) > 0.25)
      .attr('x', 0)
      .attr('y', '1.3em')

    this.pie = d3.pie()
      .sort(null)
      .value((d: any) => d.value);

    this.draw();
    window.addEventListener('resize', this.resize.bind(this));
  }

  private setSVGDimensions() {
    this.mainContainer = this.svg.append('g')
    .attr('transform', 'translate(' + this.radius + ',' + this.radius + ')');

    this.svg
      .attr('width', this.radius * 2)
      .attr('height', this.radius * 2);
  }

  private draw() {
    this.setArcs();
    this.drawSlices();
  }

  private setArcs() {
    this.arc = d3.arc()
      .outerRadius(this.radius)
      .innerRadius(0)
      .innerRadius(this.radius * this.thickness);
  }

  pathAnim(path, dir, thisRadius, thisColor) {
    switch (dir) {
      case 0:
        path
          .style("fill", function (d) { return d3.rgb(thisColor).darker(-0.1); })
          .style("stroke", function (d) { return d3.rgb(thisColor).darker(-0.3); })

          .transition()
          .duration(500)
          .ease(d3.easeBounce)
          .attr('d', d3.arc()
            .innerRadius(thisRadius * 0.65)
            .outerRadius(thisRadius));
        break;

      case 1:
        path
          .style("fill", function (d) { return d3.rgb(thisColor).darker(0.1); })
          .style("stroke", function (d) { return d3.rgb(thisColor).darker(0.3); })
          .transition()
          .duration(500)
          .ease(d3.easeBounce)
          .attr('d', d3.arc()
            .innerRadius(thisRadius * 0.55)
            .outerRadius(thisRadius));
        break;
    }
  }

  private drawSlices() {

    const circleText = this.circleText
    const circleTitle = this.circleTitle
    const pathAnim = this.pathAnim
    const thisRadius = this.radius
    const thisArc = this.arc

    this.slices = this.mainContainer.selectAll('path')
      .remove()
      .exit()
      .data(this.pie(this.dataSource))
      .enter().append('g')
      .append('path')
    //.attr('d', this.arc)

    this.slices
      .transition().delay(function (d, i) {
        return i * 500;
      }).duration(500)
      .attrTween('d', function (d) {
        var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
        return function (t) {
          d.endAngle = i(t);
          return thisArc(d)
        }
      });


    this.slices
      .attr('fill', 'transparent')
      .attr('class', (d, i) => 'color-' + i)
      .style("stroke-width", "0.1em")

      .on("mouseover", function (d, i) {
        pathAnim(d3.select(this), 1, thisRadius, d3.select(this).style("fill"));
        circleTitle.text(d.data.name)
          .attr("fill", d3.select(this).style("fill"));
        circleText.text(d.data.value)
          .attr("fill", d3.select(this).style("fill"));
      })
      .on("mouseout", function (d, i) {
        pathAnim(d3.select(this), 0, thisRadius, d3.select(this).style("fill"));
        circleTitle.text('')
        circleText.text('')
      })
  }

  private resize() {
    this.setSVGDimensions();
    this.setArcs();
    this.repaint();
  }

  private repaint() {
    this.drawSlices();
  }


}