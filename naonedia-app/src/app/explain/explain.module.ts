import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { EXPLAIN_ROUTE } from './explain.route';
import { ExplainComponent } from './explain.component';

@NgModule({
    imports: [SharedModule, RouterModule.forChild([EXPLAIN_ROUTE])],
    declarations: [ExplainComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExplainModule {}
