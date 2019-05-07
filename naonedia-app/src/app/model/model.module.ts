import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChatBotSharedModule } from '../shared';
import { MODEL_ROUTE } from './model.route';
import { ModelComponent } from './model.component';

@NgModule({
    imports: [ChatBotSharedModule, RouterModule.forChild([MODEL_ROUTE])],
    declarations: [ModelComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatBotModelModule {}
