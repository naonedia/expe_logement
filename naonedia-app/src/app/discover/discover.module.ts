import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { MODEL_ROUTE } from './discover.route';
import { DiscoverComponent } from './discover.component';

@NgModule({
    imports: [SharedModule, RouterModule.forChild([MODEL_ROUTE])],
    declarations: [DiscoverComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DiscoverModule {}
