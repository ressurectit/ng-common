import {Injectable, ClassProvider} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpEventType, HTTP_INTERCEPTORS, HttpRequest} from '@angular/common/http';
import {Observable, tap} from 'rxjs';

import {ProgressIndicatorService} from '../services/progressIndicator.service';
import {PROGRESS_INDICATOR_GROUP_NAME} from '../misc/tokens';
import {IGNORED_INTERCEPTORS} from '../../../types/tokens';

/**
 * ProgressInterceptor used for intercepting http requests and displaying progress indicatior
 */
@Injectable()
export class ProgressInterceptor implements HttpInterceptor
{
    //######################### constructors #########################
    constructor(private _indicatorSvc: ProgressIndicatorService)
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
        return next.handle(req)
            .pipe(tap(event =>
            {
                //interceptor is ignored
                if(req.context.get(IGNORED_INTERCEPTORS).some(itm => itm == ProgressInterceptor))
                {
                    return;
                }

                //request started
                if(event.type == HttpEventType.Sent)
                {
                    this._indicatorSvc.showProgress(req.context.get(PROGRESS_INDICATOR_GROUP_NAME));
                }
                //response received
                else if(event.type == HttpEventType.Response)
                {
                    this._indicatorSvc.hideProgress(req.context.get(PROGRESS_INDICATOR_GROUP_NAME));
                }
            }, () => this._indicatorSvc.hideProgress(req.context.get(PROGRESS_INDICATOR_GROUP_NAME))));
    }
}

/**
 * Progress interceptor provider
 */
export const PROGRESS_INTERCEPTOR_PROVIDER: ClassProvider = 
{
    provide: HTTP_INTERCEPTORS, 
    useClass: ProgressInterceptor, 
    multi: true
};