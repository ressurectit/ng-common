import {Routes} from '@angular/router';

import {accessDeniedRoute} from '../pages/accessDenied/accessDenied.route';
import {notFoundRoute} from '../pages/notFound/notFound.route';
import {defaultRoutes} from '../pages/+default/default.routes';

export const routes: Routes =
[
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    ...defaultRoutes,
    accessDeniedRoute,
    notFoundRoute,
];