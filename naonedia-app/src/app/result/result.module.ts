import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChatBotSharedModule } from '../shared';
import { MODEL_ROUTE } from './result.route';
import { ResultComponent } from './result.component';

@NgModule({
    imports: [ChatBotSharedModule, RouterModule.forChild([MODEL_ROUTE])],
    declarations: [ResultComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ResultModule {}
