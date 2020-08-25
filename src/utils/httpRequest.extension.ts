import {HttpRequest} from '@angular/common/http';

import {AdditionalInfo} from '../types/additionalInfo';

//updates http request clone to correctly append also additional info to cloned request
const clone = HttpRequest.prototype.clone;

HttpRequest.prototype.clone = (function(this: AdditionalInfo)
{
    let request: AdditionalInfo = clone.apply(this, arguments);

    request.additionalInfo = this.additionalInfo;

    return request;
}) as any;