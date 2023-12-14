import {NgModuleRef, ApplicationRef, InjectionToken, ComponentRef, EmbeddedViewRef} from '@angular/core';
import {enableDebugTools} from '@angular/platform-browser';
import {Action1} from '@jscrpt/common';
import {filter, first} from 'rxjs';

/**
 * Method used for extraction of resolve method for promise
 * @param appStablePromise - Promise which contains resolve method that is going to be extracted
 */
export function extractAppStableResolve(appStablePromise: Promise<void>): () => void
{
    return (appStablePromise as any).__resolve;
}

/**
 * Factory used for creating APP_STABLE promise
 * 
 * @internal
 */
export function appStablePromiseFactory(): Promise<void>
{
    let appStableResolve;
    const appStablePromise = new Promise<void>(resolve => appStableResolve = resolve);

    (appStablePromise as any).__resolve = appStableResolve;

    return appStablePromise;
}

/**
 * Injection token used for obtaining promise that is resolved when application is first time stable
 */
export const APP_STABLE: InjectionToken<Promise<void>> = new InjectionToken<Promise<void>>('APP_STABLE', {providedIn: 'root', factory: appStablePromiseFactory});

/**
 * Runs callback function when angular app is bootstrapped and stable
 * @param appRefPromise -Promise for application reference that was bootstrapped
 * @param callback -Callback that is called when app is stable
 * @param angularProfiler - Indication that angular profiler should be enabled
 */
export function runWhenAppStable(appRefPromise: Promise<ApplicationRef>, callback: Action1<ApplicationRef>, angularProfiler?: boolean): void
{
    angularProfiler = angularProfiler ?? false;

    appRefPromise.then(appRef => 
    {
        appRef.isStable
            .pipe(filter(isStable => isStable),
                  first())
            .subscribe(() => 
            {
                const appStablePromise = appRef.injector.get(APP_STABLE);

                if(angularProfiler)
                {
                    enableDebugTools(appRef.components[0]);
                }

                callback(appRef);

                const resolveAsStable = extractAppStableResolve(appStablePromise);
                resolveAsStable();
            });
    });
}

/**
 * Runs callback function when angular module is bootstrapped and stable
 * @param moduleRefPromise - Promise for module that was bootstrapped
 * @param callback - Callback that is called
 * @param angularProfiler - Indication that angular profiler should be enabled
 */
export function runWhenModuleStable(moduleRefPromise: Promise<NgModuleRef<unknown>>, callback: (moduleRef: NgModuleRef<unknown>) => void, angularProfiler?: boolean): void
{
    angularProfiler = angularProfiler || false;

    moduleRefPromise.then((moduleRef: NgModuleRef<unknown>) => 
    {
        const appRef: ApplicationRef = moduleRef.injector.get(ApplicationRef);

        appRef.isStable
            .pipe(filter((isStable: boolean) => isStable),
                  first())
            .subscribe(() => 
            {
                const appStablePromise = moduleRef.injector.get(APP_STABLE);

                if(angularProfiler)
                {
                    enableDebugTools(appRef.components[0]);
                }

                callback(moduleRef);

                if(appStablePromise)
                {
                    const resolveAsStable = extractAppStableResolve(appStablePromise);

                    resolveAsStable();
                }
            });
    });
}

/**
 * Gets host html element for component
 * @param component - Component ref of dynamically created component
 */
export function getHostElement<TType>(component: ComponentRef<TType>|undefined|null): HTMLElement|undefined|null
{
    return (component?.hostView as EmbeddedViewRef<unknown>)?.rootNodes?.[0];
}