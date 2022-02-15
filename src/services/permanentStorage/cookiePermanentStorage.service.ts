import {Injectable} from "@angular/core";

import {PermanentStorage} from "./permanentStorage.interface";
import {CookieService} from "../cookies/cookies.service";

/**
 * Implementation of permanent storage using cookies
 */
@Injectable()
export class CookiePermanentStorageService implements PermanentStorage
{
    //######################### constructor #########################
    constructor(private _cookies: CookieService)
    {
    }

    //######################### public methods - implementation of StringLocalization #########################

    /**
     * Gets value that was stored with 'name' from permanent storage
     * @param name - Name with which was value stored
     */
    public get<TResult>(name: string): TResult
    {
        return this._cookies.getCookie(name);
    }

    /**
     * Sets value that will be stored with 'name'e in permanent storage
     * @param name - Name with which will be value stored
     * @param value - Value to be stored
     */
    public set(name: string, value: any): void;

    /**
     * Sets value that will be stored with 'name' in permanent storage until expiration date
     * @param name - Name with which will be value stored
     * @param value - Value to be stored
     * @param expires - Time when value should expire
     */
    public set(name: string, value: any, expires: Date): void;

    /**
     * Sets value that will be stored with 'name' in permanent storage until expiration date
     * @param name - Name with which will be value stored
     * @param value - Value to be stored
     * @param expires - Time when value should expire
     */
    public set(name: string, value: any, expires?: Date): void
    {
        this._cookies.setCookie(name, value, expires ? expires.valueOf() : null, '/');
    }

    /**
     * Removes value stored with 'name' from permanent storage
     * @param name - Name of stored value that will be removed
     */
    public remove(name: string): void
    {
        this._cookies.deleteCookie(name, '/');
    }
}