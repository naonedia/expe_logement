import { Route } from '@angular/router';

import { VisualizationComponent } from './visualization.component';

export const VISUALIZATION_ROUTE: Route = {
    path: 'visualization',
    component: VisualizationComponent,
    data: {
        pageTitle: 'home.title'
    }
};
