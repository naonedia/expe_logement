import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { RESULT_ROUTE } from './result.route';
import { ResultComponent } from './result.component';

@NgModule({
    imports: [SharedModule, RouterModule.forChild([RESULT_ROUTE])],
    declarations: [ResultComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ResultModule {}
