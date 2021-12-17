import {NgModuleRef, ApplicationRef, InjectionToken} from '@angular/core';
import {enableDebugTools} from '@angular/platform-browser';
import {filter, first} from 'rxjs/operators';

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