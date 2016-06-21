import {Route} from '@angular/router';

/**
 * Extended type with route definition
 */
export interface RouteDecoratedComponent
{
    /**
     * Definition of route that is assigned to this type
     */
    routeDefinitionValue: Route;
}

/**
 * Defines route for component on which is this decorator applied
 * @param  {Route} route Definition of route, does not require component to be set
 * @returns ClassDecorator
 */
export function ComponentRoute(route: Route): ClassDecorator
{
    return function <TFunction extends Function> (target: TFunction): TFunction
    {
        route.component = target;
        
        Object.defineProperty(target, 
                              'routeValue', 
                              {
                                  enumerable: true,
                                  configurable: false,
                                  writable: false,
                                  value: route
                              });
        
        return target;
    };
}