import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

import * as d3 from "d3";

@Component({
    selector: 'app-visualization',
    templateUrl: './visualization.component.html',
    styleUrls: ['visualization.scss']
})
export class VisualizationComponent {
    @ViewChild('barChart1')
    chartContainer1: ElementRef;

    @ViewChild('barChart2')
    private chartContainer2: ElementRef;

    @ViewChild('barChart3')
    private chartContainer3: ElementRef;

    @ViewChild('barChart4')
    private chartContainer4: ElementRef;

    margin = { top: 40, right: 40, bottom: 40, left: 40 };
    marginPie = 40;
    pie;
    pie2;

    // Create dummy data
    public data = [{
        "letter": "A",
        "frequency": 0.08167
    }, {
        "letter": "B",
        "frequency": 0.01492
    }, {
        "letter": "C",
        "frequency": 0.02782
    }, {
        "letter": "D",
        "frequency": 0.04253
    }, {
        "letter": "E",
        "frequency": 0.12702
    }, {
        "letter": "F",
        "frequency": 0.02288
    }, {
        "letter": "G",
        "frequency": 0.02015
    }, {
        "letter": "H",
        "frequency": 0.06094
    }, {
        "letter": "I",
        "frequency": 0.06966
    }, {
        "letter": "J",
        "frequency": 0.00153
    }, {
        "letter": "K",
        "frequency": 0.00772
    }, {
        "letter": "L",
        "frequency": 0.04025
    }, {
        "letter": "M",
        "frequency": 0.02406
    }, {
        "letter": "N",
        "frequency": 0.06749
    }, {
        "letter": "O",
        "frequency": 0.07507
    }, {
        "letter": "P",
        "frequency": 0.01929
    }, {
        "letter": "Q",
        "frequency": 0.00095
    }, {
        "letter": "R",
        "frequency": 0.05987
    }, {
        "letter": "S",
        "frequency": 0.06327
    }, {
        "letter": "T",
        "frequency": 0.09056
    }, {
        "letter": "U",
        "frequency": 0.02758
    }, {
        "letter": "V",
        "frequency": 0.00978
    }, {
        "letter": "W",
        "frequency": 0.0236
    }, {
        "letter": "X",
        "frequency": 0.0015
    }, {
        "letter": "Y",
        "frequency": 0.01974
    }, {
        "letter": "Z",
        "frequency": 0.00074
    }]

    public data2 = { a: 9, b: 20, c: 30, d: 8, e: 12 };

    constructor(private router: Router, private translateService: TranslateService) { }

    ngOnInit() {
        this.createChart1();
        this.createChart2();
        //this.createChart3();
    }

    onResize() {
        this.createChart1();
        this.createChart2();
        //this.createChart3();
    }

    createChart1() {
        const element = this.chartContainer1.nativeElement;
        const data = this.data;

        d3.select(element).select('svg').remove();

        const svg = d3.select(element).append('svg')
            .attr('width', element.offsetWidth)
            .attr('height', element.offsetHeight);

        const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
        const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;

        const x = d3
            .scaleTime()
            .rangeRound([0, contentWidth])
            .domain(this.data.map(d => parseInt(d.letter)));

        const y = d3
            .scaleLinear()
            .rangeRound([contentHeight, 0])
            .domain([0, d3.max(this.data, d => d.frequency)]);

        const g = svg.append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

        g.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,' + contentHeight + ')')
            .call(d3.axisBottom(x));

        g.append('g')
            .attr('class', 'axis axis--y')
            .call(d3.axisLeft(y).ticks(10, '%'))
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '0.71em')
            .attr('text-anchor', 'end')
            .text('Frequency');

        g.selectAll('.bar')
            .data(this.data)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', d => x(parseInt(d.letter)))
            .attr('y', d => y(d.frequency))
            //.attr('width', x.bandwidth())
            .attr('height', d => contentHeight - y(d.frequency));
    }


    createChart2() {
        const element = this.chartContainer2.nativeElement;
        const data = this.data;

        d3.select(element).select('svg').remove();

        const svg = d3.select(element).append('svg')
            .attr('width', element.offsetWidth)
            .attr('height', element.offsetHeight);

        const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
        const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;

        const x = d3
            .scaleBand()
            .rangeRound([0, contentWidth])
            .padding(0.1)
            .domain(this.data.map(d => d.letter));

        const y = d3
            .scaleLinear()
            .rangeRound([contentHeight, 0])
            .domain([0, d3.max(this.data, d => d.frequency)]);

        const g = svg.append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

        g.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,' + contentHeight + ')')
            .call(d3.axisBottom(x));

        g.append('g')
            .attr('class', 'axis axis--y')
            .call(d3.axisLeft(y).ticks(10, '%'))
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '0.71em')
            .attr('text-anchor', 'end')
            .text('Frequency');

        g.selectAll('.bar')
            .data(this.data)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d.letter))
            .attr('y', d => y(d.frequency))
            .attr('width', x.bandwidth())
            .attr('height', d => contentHeight - y(d.frequency));
    }

    createChart3() {
        const element = this.chartContainer3.nativeElement;


        const color: any = d3
            .scaleOrdinal()
            .domain(Object.keys(this.data2))
            .range(d3.schemeDark2);

        d3.select(element).select('svg').remove();

        const svg = d3.select(element).append('svg')
            .attr('width', element.offsetWidth)
            .attr('height', element.offsetHeight);

        const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
        const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;

        this.pie2 = d3
            .pie()
            .value(function (d: any) { return d.value })

        const data_ready = this.pie2(d3.entries(this.data2))

        const g = svg.append('g')
            .attr('transform', 'translate(' + contentWidth / 2 + ',' + contentHeight / 2 + ')');

        g
            .selectAll('whatever')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', d3.arc()
                .innerRadius(Math.min(contentHeight, contentWidth) / 2)         // This is the size of the donut hole
                .outerRadius(Math.min(contentHeight, contentWidth) / 3))
            .attr('fill', (d: any) => { return (color(d.data.key)) })
            .attr("stroke", "black")
            .style("stroke-width", "2px")
            .style("opacity", 0.7)

    }

}
