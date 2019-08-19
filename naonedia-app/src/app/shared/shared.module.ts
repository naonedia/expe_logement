import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { SharedLibsModule } from './shared-libs.module';
import { SharedCommonModule } from './shared-common.module';

@NgModule({
    imports: [SharedLibsModule, SharedCommonModule],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    exports: [SharedCommonModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class SharedModule {
    static forRoot() {
        return {
            ngModule: SharedModule
        };
    }
}
