import { Route } from '@angular/router';

import { ExplainComponent } from './explain.component';

export const EXPLAIN_ROUTE: Route = {
    path: 'explain',
    component: ExplainComponent,
    data: {
        pageTitle: 'home.title'
    }
};
