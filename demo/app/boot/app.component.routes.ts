import {Routes} from '@angular/router';

import {accessDeniedRoute} from '../pages/accessDenied/accessDenied.route';
import {notFoundRoute} from '../pages/notFound/notFound.route';

export const routes: Routes = 
[
    {
        path: '',
        loadChildren: () => import('../pages/+default/default.module')
    },
    accessDeniedRoute,
    notFoundRoute,
];