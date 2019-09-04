import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { ABOUT_ROUTE } from './about.route';
import { AboutComponent } from './about.component';

@NgModule({
    imports: [SharedModule, RouterModule.forChild([ABOUT_ROUTE])],
    declarations: [AboutComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AboutModule {}
