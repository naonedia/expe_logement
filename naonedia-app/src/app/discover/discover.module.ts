import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { DISCOVER_ROUTE } from './discover.route';
import { DiscoverComponent } from './discover.component';

@NgModule({
    imports: [SharedModule, RouterModule.forChild([DISCOVER_ROUTE])],
    declarations: [DiscoverComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DiscoverModule {}
