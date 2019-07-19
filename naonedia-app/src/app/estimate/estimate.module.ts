import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChatBotSharedModule } from '../shared';
import { ESTIMATE_ROUTE } from './estimate.route';
import { EstimateComponent } from './estimate.component';

@NgModule({
    imports: [ChatBotSharedModule, RouterModule.forChild([ESTIMATE_ROUTE])],
    declarations: [EstimateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [EstimateComponent]
})
export class EstimateModule {}
