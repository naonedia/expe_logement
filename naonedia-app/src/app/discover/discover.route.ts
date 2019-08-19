import { Route } from '@angular/router';

import { DiscoverComponent } from './discover.component';

export const MODEL_ROUTE: Route = {
    path: 'discover',
    component: DiscoverComponent,
    data: {
        pageTitle: 'home.title'
    }
};
