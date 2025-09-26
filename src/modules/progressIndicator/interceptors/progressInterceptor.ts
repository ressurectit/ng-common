import {Injectable, ClassProvider, inject, Injector, runInInjectionContext} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpEventType, HTTP_INTERCEPTORS, HttpRequest, HttpHandlerFn} from '@angular/common/http';
import {Observable, tap} from 'rxjs';

import {ProgressIndicatorService} from '../services/progressIndicator.service';
import {PROGRESS_INDICATOR_GROUP_NAME} from '../misc/tokens';
import {IGNORED_INTERCEPTORS} from '../../../types/tokens';

/**
 * Progress interceptor used for intercepting http requests and displaying progress indicatior
 * @param req - Request to be intercepted
 * @param next - Next function for passing request to next interceptor
 */
export function progressInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>>
{
    const indicatorSvc = inject(ProgressIndicatorService);

    return next(req)
            .pipe(tap(
            {
                next: event =>
                {
                    //interceptor is ignored
                    if(req.context.get(IGNORED_INTERCEPTORS).some(itm => itm == ProgressInterceptor || itm == progressInterceptor))
                    {
                        return;
                    }

                    //request started
                    if(event.type == HttpEventType.Sent)
                    {
                        indicatorSvc.showProgress(req.context.get(PROGRESS_INDICATOR_GROUP_NAME));
                    }
                    //response received
                    else if(event.type == HttpEventType.Response)
                    {
                        indicatorSvc.hideProgress(req.context.get(PROGRESS_INDICATOR_GROUP_NAME));
                    }
                },
                error: () => indicatorSvc.hideProgress(req.context.get(PROGRESS_INDICATOR_GROUP_NAME)),
            }));
}

/**
 * ProgressInterceptor used for intercepting http requests and displaying progress indicatior
 * @deprecated - Use new `progressInterceptor` function instead
 */
@Injectable()
export class ProgressInterceptor implements HttpInterceptor
{
    //######################### constructors #########################
    constructor(private _injector: Injector)
    {
    }

    //######################### public methods - implementation of HttpInterceptor #########################

    /**
     * Intercepts http request
     * @param req - Request to be intercepted
     * @param next - Next middleware that can be called for next processing
     */
    public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>
    {
        return runInInjectionContext(this._injector, () => progressInterceptor(req, next.handle.bind(next)));
    }
}

/**
 * Progress interceptor provider
 * @deprecated - Use new `progressInterceptor` function instead
 */
export const PROGRESS_INTERCEPTOR_PROVIDER: ClassProvider =
{
    provide: HTTP_INTERCEPTORS,
    useClass: ProgressInterceptor,
    multi: true,
};
