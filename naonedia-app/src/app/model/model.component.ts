import {
    Component,
    OnInit,
    OnDestroy,
    EventEmitter,
    AfterViewInit,
    AfterContentChecked,
    AfterViewChecked,
    AfterContentInit
} from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { Chart } from 'chart.js';
import { Options } from 'ng5-slider';
import { LocationNantes } from '../shared/model/locationNantes.model';
import { UserInput } from '../shared/model/userInput.model';
import { HouseType } from '../shared/model/houseType.model';

@Component({
    selector: 'app-model',
    templateUrl: './model.component.html'
})
export class ModelComponent implements OnInit, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
    // Chart options
    accuracy = Chart;
    samples = Chart;
    datas = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];

    // Retrieve locations
    locations = LocationNantes;

    // User input
    userInput = new UserInput(HouseType.APPARTEMENT, 50, 2, this.locations[10] );
    value = 0;


    // Slider options
    manualRefresh: EventEmitter<void> = new EventEmitter<void>();
    options: Options = {
        floor: 0,
        ceil: 250
    };

    constructor(private translateService: TranslateService) {}

    locationNantesKeys(): Array<string> {
        const keys = Object.keys(LocationNantes);
        return keys.slice(keys.length / 2);
    }

    ngOnInit() {
        this.manualRefresh.emit();

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
    ngAfterContentInit() {
        this.manualRefresh.emit();
    }

    ngAfterContentChecked() {
        this.manualRefresh.emit();
    }

    ngAfterViewInit() {
        this.manualRefresh.emit();
    }

    ngAfterViewChecked() {
        this.manualRefresh.emit();
    }

    ngOnDestroy() {}

    onSubmit() {
        console.log('submitted');
        // this.datas = this.datas.map(x => x + this.userInput.groundSurface);
        this.accuracy.data.datasets[0].data = this.accuracy.data.datasets[0].data.map(x => x * this.userInput.groundSurface);
        this.accuracy.update();
        this.accuracy.render();
        console.log(this.datas);
        console.log('end submitted');
    }
}
