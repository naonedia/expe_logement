import { Route } from '@angular/router';

import { ModelComponent } from './model.component';

export const MODEL_ROUTE: Route = {
    path: 'model',
    component: ModelComponent,
    data: {
        pageTitle: 'home.title'
    }
};
