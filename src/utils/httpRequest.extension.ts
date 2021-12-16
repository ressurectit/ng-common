import {HttpRequest} from '@angular/common/http';

import {AdditionalInfo} from '../types/additionalInfo';

/**
 * Updates HttpRequest.clone() method, adds support for cloning also additionalInfo
 */
export function updateHttpRequestClone()
{
    //updates http request clone to correctly append also additional info to cloned request
    const clone = HttpRequest.prototype.clone;

    HttpRequest.prototype.clone = (function(this: AdditionalInfo, ...args: any[])
    {
        const request: AdditionalInfo = clone.apply(this, args);

        request.additionalInfo = this.additionalInfo;

        return request;
    }) as any;
}