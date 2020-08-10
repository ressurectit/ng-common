import {Injectable, Type} from "@angular/core";
import {HttpRequest} from '@angular/common/http'

//updates http request clone to correctly append also request id to cloned request
const clone = HttpRequest.prototype.clone;

HttpRequest.prototype.clone = (function()
{
    let request: IgnoredInterceptorId = clone.apply(this, arguments);

    request.requestId = this.requestId;

    return request;
}) as any;

/**
 * Contains id of request, used for IgnoredInterceptorsService
 */
export interface IgnoredInterceptorId
{
    /**
     * Identification of request
     */
    requestId?: string;
}

/**
 * Http request with request id for IgnoredInterceptorsService
 */
export interface HttpRequestIgnoredInterceptorId<TBody> extends HttpRequest<TBody>, IgnoredInterceptorId
{
}

/**
 * Service used for disabling specific http client interceptor for one call, if you add interceptor you want to disable before call it will be disabled
 */
@Injectable({providedIn: 'root'})
export class IgnoredInterceptorsService
{
    //######################### private fields #########################

    /**
     * Array of interceptors that will be ignored
     */
    private _ignoredInterceptors: {type: Type<any>, requestId: string}[] = [];

    //######################### public methods #########################

    /**
     * Clears all ignored interceptors from service
     */
    public clear(): void
    {
        this._ignoredInterceptors = [];
    }

    /**
     * Adds interceptor type that should be ignored for specified url
     * @param interceptorType - Type of interceptor should be ignored
     * @param requestId - Object containing request id
     */
    public addInterceptor<TType>(interceptorType: Type<TType>, requestId: IgnoredInterceptorId): void
    {
        if(!requestId.requestId)
        {
            return;
        }

        if(!this._ignoredInterceptors.find(itm => itm.type == interceptorType && itm.requestId == requestId.requestId))
        {
            this._ignoredInterceptors.push(
            {
                type: interceptorType,
                requestId: requestId.requestId
            });
        }
    }

    /**
     * Checks specified interceptor whether is ingored
     * @param interceptorType - Type of interceptor that is checked whether is ignored
     * @param url - Object containing request id
     */
    public isIgnored<TType>(interceptorType: Type<TType>, requestId: IgnoredInterceptorId): boolean
    {
        if(!requestId.requestId)
        {
            return false;
        }

        let item = this._ignoredInterceptors.find(itm => itm.requestId == requestId.requestId && itm.type == interceptorType);

        if(item)
        {
            this._ignoredInterceptors.splice(this._ignoredInterceptors.indexOf(item), 1);

            return true;
        }

        return false;
    }
}