import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { HEALTHCHECK_ROUTE } from './healthcheck.route';
import { HealthcheckComponent } from './healthcheck.component';

@NgModule({
    imports: [SharedModule, RouterModule.forChild([HEALTHCHECK_ROUTE])],
    declarations: [HealthcheckComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [HealthcheckComponent]
})
export class HealthcheckModule {}
