import { Route } from '@angular/router';

import { ParticipateComponent } from './participate.component';

export const PARTICIPATE_ROUTE: Route = {
    path: 'participate',
    component: ParticipateComponent,
    data: {
        pageTitle: 'home.title'
    }
};
