import {Type} from '@angular/core';
import {Route} from '@angular/router';
import {isPresent} from '@jscrpt/common';

import {RouteDecoratedComponent} from '../decorators/componentRoute.decorator';
import {RedirectRouteDecoratedComponent} from '../decorators/componentRedirectRoute.decorator';

/**
 * All types of route decorated components
 */
interface RoutesDecoratedComponent extends RouteDecoratedComponent, RedirectRouteDecoratedComponent
{
}

/**
 * Extracts route definitions from components if routes are set using decorator ComponentRoute
 * @param components - Array of components to be used for extraction
 * @returns RouteDefinition Extracted routes
 */
export function extractRoutes(components: Type<any>[]): Route[]
{
    const result: Route[] = [];
    
    if(!components)
    {
        return result;
    }
    
    (components as any[]).forEach((component: RoutesDecoratedComponent) =>
    {
        if(isPresent(component.routeValues))
        {
            component.routeValues.forEach(route =>
            {
                result.push(route);
            });
        }

        if(isPresent(component.redirectRouteValues))
        {
            component.redirectRouteValues.forEach(route =>
            {
                result.push(route);
            });
        }
    });
    
    return result;
}