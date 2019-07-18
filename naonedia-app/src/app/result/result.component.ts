import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { Chart } from 'chart.js';
import { HouseType } from '../shared/model/houseType.model';


@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['result.scss']
})
export class ResultComponent implements OnInit {
    // Chart options
    accuracy = Chart;
    samples = Chart;
    datas = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];

    houseTypeList = Object.keys(HouseType)

    constructor(private translateService: TranslateService) {}

    ngOnInit() {
        this.accuracy = new Chart('canvas1', {
            type: 'line',
            data: {
                labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
                datasets: [{ data: this.datas, borderColor: '#3cba9f', fill: false }]
            },
            options: {
                responsive: true,
                legend: { display: false },
                scales: {
                    xAxes: [{ display: true, scaleLabel: { display: true, labelString: 'Epochs' } }],
                    yAxes: [{ display: true, scaleLabel: { display: true, labelString: 'Accuracy' } }]
                }
            }
        });

        this.samples = new Chart('canvas2', {
            type: 'line',
            data: {
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                datasets: [{ data: [1, 2, 4 , 8, 16, 20, 32, 42, 64], borderColor: '#3cba9f', fill: false }]
            },
            options: {
                responsive: true,
                legend: { display: false },
                scales: {
                    xAxes: [{ display: true, scaleLabel: { display: true, labelString: 'Epochs' } }],
                    yAxes: [{ display: true, scaleLabel: { display: true, labelString: 'Number of sample' } }]
                }
            }
        });
    }
}
