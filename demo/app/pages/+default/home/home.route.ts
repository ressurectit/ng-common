import {Route} from '@angular/router';

/**
 * Route for home component
 */
export const homeRoute: Route =
{
    path: 'home',
    loadComponent: () => import('./home.component'),
};
