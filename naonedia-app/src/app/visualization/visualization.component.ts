import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Options } from 'ng5-slider';

@Component({
    selector: 'app-visualization',
    templateUrl: './visualization.component.html',
    styleUrls: ['visualization.scss']
})
export class VisualizationComponent {
    constructor(translateService: TranslateService) { }

    value: number = 50;
    options: Options = {
        floor: 0,
        ceil: 100
    };
}
