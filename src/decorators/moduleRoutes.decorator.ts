import {Type} from '@angular/core';
import {RouterModule, Route} from '@angular/router';

import {Utils} from '../utils/utils';

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
     * Routes that will be set before routedComponents
     */
    staticRoutesBefore?: Route[];

    /**
     * Routes that will be set after routedComponents
     */
    staticRoutesAfter?: Route[];
}

/**
 * Registers routes for module to which is attached
 * @param routedComponents Array of components that will be used for routes extration
 * @param options Optional options for defining routes
 */
export function ModuleRoutes(routedComponents: Type<any>[], options: ModuleRoutesOptions = {rootModule: false, staticRoutesAfter: [], staticRoutesBefore: []})
{
    return function<TFunction extends Function> (target: TFunction): TFunction
    {
        let ngModule: 
        {
            ngInjectorDef:
            {
                imports: any[]
            }
        } = target as any;
        
        if(ngModule.ngInjectorDef && Array.isArray(ngModule.ngInjectorDef.imports))
        {
            let routes = 
            [
                ...options.staticRoutesBefore || [],
                ...Utils.routerHelper.extractRoutes(routedComponents),
                ...options.staticRoutesAfter || []
            ];

            ngModule.ngInjectorDef.imports.push(options.rootModule ? RouterModule.forRoot(routes) : RouterModule.forChild(routes));
        }

        return target;
    };
}