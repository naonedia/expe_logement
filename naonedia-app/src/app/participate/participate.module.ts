import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChatBotSharedModule } from '../shared';
import { PARTICIPATE_ROUTE } from './participate.route';
import { ParticipateComponent } from './participate.component';

@NgModule({
    imports: [ChatBotSharedModule, RouterModule.forChild([PARTICIPATE_ROUTE])],
    declarations: [ParticipateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ParticipateModule {}
