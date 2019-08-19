import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { PARTICIPATE_ROUTE } from './participate.route';
import { ParticipateComponent } from './participate.component';
import { EstimateModule } from '../estimate';

@NgModule({
    imports: [SharedModule, RouterModule.forChild([PARTICIPATE_ROUTE]), EstimateModule],
    declarations: [ParticipateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ParticipateModule {}
