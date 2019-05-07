import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { ChatBotSharedLibsModule } from './shared-libs.module';
import { ChatBotSharedCommonModule } from './shared-common.module';

@NgModule({
    imports: [ChatBotSharedLibsModule, ChatBotSharedCommonModule],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    exports: [ChatBotSharedCommonModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ChatBotSharedModule {
    static forRoot() {
        return {
            ngModule: ChatBotSharedModule
        };
    }
}
