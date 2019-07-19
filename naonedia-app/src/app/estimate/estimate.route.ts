import { Route } from '@angular/router';

import { EstimateComponent } from './estimate.component';

export const ESTIMATE_ROUTE: Route = {
    path: 'estimate',
    component: EstimateComponent,
    data: {
        pageTitle: 'home.title'
    }
};
