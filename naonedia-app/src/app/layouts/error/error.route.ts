import { Routes } from '@angular/router';

import { ErrorComponent } from './error.component';

export const errorRoute: Routes = [
    {
        path: 'error',
        component: ErrorComponent,
        data: {
            pageTitle: 'error.title'
        }
    },
    {
        path: 'accessdenied',
        component: ErrorComponent,
        data: {
            pageTitle: 'error.title',
            error403: true
        }
    },
    {
        path: '404',
        component: ErrorComponent,
        data: {
            pageTitle: 'error.title',
            error404: true
        }
    },
    {
        path: '**',
        redirectTo: '/404'
    }
];
