import {Injectable, ClassProvider, Optional} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpEventType, HTTP_INTERCEPTORS, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {ProgressIndicatorService} from '../services/progressIndicator.service';
import {IgnoredInterceptorsService, IgnoredInterceptorId} from '../../../services/ignoredInterceptors/ignoredInterceptors.service';
import {AdditionalInfo} from '../../../types/additionalInfo';
import {LocalProgressIndicatorName} from '../misc/types';

/**
 * ProgressInterceptor used for intercepting http requests and displaying progress indicatior
 */
@Injectable()
export class ProgressInterceptor implements HttpInterceptor
{
    //######################### constructors #########################
    constructor(private _indicatorSvc: ProgressIndicatorService,
                @Optional() private _ignoredInterceptorsService?: IgnoredInterceptorsService)
    {
    }

    //######################### public methods - implementation of HttpInterceptor #########################

    /**
     * Intercepts http request
     * @param req - Request to be intercepted
     * @param next - Next middleware that can be called for next processing
     */
    public intercept(req: HttpRequest<any> & AdditionalInfo<LocalProgressIndicatorName & IgnoredInterceptorId>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        return next.handle(req)
            .pipe(tap(event =>
            {
                if (this._ignoredInterceptorsService && this._ignoredInterceptorsService.isIgnored(ProgressInterceptor, req.additionalInfo))
                {
                    return;
                }

                //request started
                if(event.type == HttpEventType.Sent)
                {
                    this._indicatorSvc.showProgress(req.additionalInfo?.progressGroupName);
                }
                //response received
                else if(event.type == HttpEventType.Response)
                {
                    this._indicatorSvc.hideProgress(req.additionalInfo?.progressGroupName);
                }
            }, () => this._indicatorSvc.hideProgress(req.additionalInfo?.progressGroupName)));
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