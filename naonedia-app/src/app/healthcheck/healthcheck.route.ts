import { Route } from '@angular/router';

import { HealthcheckComponent } from './healthcheck.component';

export const HEALTHCHECK_ROUTE: Route = {
    path: 'healthcheck',
    component: HealthcheckComponent,
    data: {
        pageTitle: 'home.title'
    }
};
