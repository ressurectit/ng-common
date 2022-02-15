import {Route} from '@angular/router';
import {isBlank} from '@jscrpt/common';

/**
 * Extended type with route definition
 */
export interface RouteDecoratedComponent
{
    /**
     * Definition of routes that are assigned to this type
     */
    routeValues: Route[];
}

/**
 * Defines route for component on which is this decorator applied
 * @param route - route Definition of route, does not require component to be set
 */
export function ComponentRoute(route: Route): ClassDecorator
{
    return function <TFunction extends Function> (target: TFunction): TFunction
    {
        route.component = <any>target;
        
        let routeDecoratedComponent: RouteDecoratedComponent = <any>target;

        if(isBlank(routeDecoratedComponent.routeValues))
        {
            Object.defineProperty(target, 
                                  'routeValues', 
                                  {
                                      enumerable: true,
                                      configurable: false,
                                      writable: false,
                                      value: []
                                  });
        }

        routeDecoratedComponent.routeValues.push(route);
        
        return target;
    };
}