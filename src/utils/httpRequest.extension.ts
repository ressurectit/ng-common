import {HttpRequest} from '@angular/common/http';

import {AdditionalInfo} from '../types/additionalInfo';

/**
 * Updates HttpRequest.clone() method, adds support for cloning also additionalInfo
 */
export function updateHttpRequestClone()
{
    //updates http request clone to correctly append also additional info to cloned request
    const clone = HttpRequest.prototype.clone;

    HttpRequest.prototype.clone = (function(this: AdditionalInfo)
    {
        let request: AdditionalInfo&HttpRequest<any> = clone.apply(this, arguments as any);

        request.additionalInfo = this.additionalInfo;

        return request;
    }) as any;
}