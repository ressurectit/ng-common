import {Type} from '@angular/core';
import {RouterModule, Route, ExtraOptions} from '@angular/router';

import {extractRoutes} from '../misc/utils';

/**
 * Extended route with possibility to extract children from components
 */
export interface ComponentRouteChildren extends Route
{
    /**
     * Array of components which contains routes
     */
    childrenComponents?: Type<any>[];
}

/**
 * Describes options for ModuleRoutes decorator
 */
export interface ModuleRoutesOptions
{
    /**
     * Indication that `forRoot` should be used during registration of routes
     */
    rootModule?: boolean;

    /**
     * Extra options used for `forRoot` module creation
     */
    rootModuleConfig?: ExtraOptions;

    /**
     * Routes that will be set before routedComponents
     */
    staticRoutesBefore?: ComponentRouteChildren[];

    /**
     * Routes that will be set after routedComponents
     */
    staticRoutesAfter?: ComponentRouteChildren[];
}

/**
 * Extracts routes from children components
 * @param route - Route which can contain array of components with routes
 */
function extractChildrenComponents(route: ComponentRouteChildren): Route
{
    if(route.childrenComponents && route.childrenComponents.length)
    {
        let routes: ComponentRouteChildren[] = extractRoutes(route.childrenComponents).map(extractChildrenComponents);

        if(route.children && route.children.length)
        {
            route.children =
            [
                ...route.children,
                ...routes
            ];
        }
        else
        {
            route.children = routes;
        }
    }

    return route;
}

/**
 * Registers routes for module to which is attached
 * @param routedComponents - Array of components that will be used for routes extration
 * @param options - Optional options for defining routes
 */
export function ModuleRoutes(routedComponents: Type<any>[], options: ModuleRoutesOptions = {rootModule: false, staticRoutesAfter: [], staticRoutesBefore: []})
{
    return function<TFunction extends Function> (target: TFunction): TFunction
    {
        let ngModule: 
        {
            ɵinj:
            {
                imports: any[]
            }
        } = target as any;
        
        if(ngModule.ɵinj && Array.isArray(ngModule.ɵinj.imports))
        {
            let routes = 
            [
                ...(options.staticRoutesBefore || []).map(extractChildrenComponents),
                ...extractRoutes(routedComponents).map(extractChildrenComponents),
                ...(options.staticRoutesAfter || []).map(extractChildrenComponents)
            ];

            ngModule.ɵinj.imports.push(options.rootModule ? RouterModule.forRoot(routes, options.rootModuleConfig) : RouterModule.forChild(routes));
        }

        return target;
    };
}