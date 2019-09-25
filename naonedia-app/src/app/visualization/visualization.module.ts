import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { VISUALIZATION_ROUTE } from './visualization.route';
import { VisualizationComponent } from './visualization.component';
import { BarChartComponent } from '../bar-chart';
import { PieChartComponent } from '../pie-chart';

@NgModule({
    imports: [SharedModule, RouterModule.forChild([VISUALIZATION_ROUTE])],
    declarations: [VisualizationComponent, BarChartComponent, PieChartComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VisualizationModule {}
