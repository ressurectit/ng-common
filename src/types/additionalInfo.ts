import {HttpRequest} from '@angular/common/http';
import {Dictionary} from '@jscrpt/common';

//updates http request clone to correctly append also additional info to cloned request
const clone = HttpRequest.prototype.clone;

HttpRequest.prototype.clone = (function(this: AdditionalInfo)
{
    let request: AdditionalInfo = clone.apply(this, arguments);

    request.additionalInfo = this.additionalInfo;

    return request;
}) as any;

/**
 * Object containing additional info/data
 */
export interface AdditionalInfo<TAdditional = any, TItem = any>
{
    /**
     * Additional info object
     */
    additionalInfo?: Dictionary<TItem> & TAdditional;
}
