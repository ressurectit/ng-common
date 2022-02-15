import {Injectable} from '@angular/core';

/**
 * Service used for transfering http status code for response
 */
@Injectable({providedIn: 'root'})
export class StatusCodeService
{
    //######################### private fields #########################
    
    /**
     * Current status code
     */
    private _statusCode?: number;

    //######################### public properties #########################

    /**
     * Gets current status code
     */
    public get statusCode(): number | null | undefined
    {
        return this._statusCode;
    }

    //######################### public methods #########################

    /**
     * Sets current status code
     * @param code - Status code value that will be set
     */
    public setStatusCode(code?: number)
    {
        this._statusCode = code;
    }
}