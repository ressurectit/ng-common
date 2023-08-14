import {ClassProvider, Injectable, Provider} from '@angular/core';

import {PermanentStorage, PermanentStorageType} from './permanentStorage.interface';
import {CookieService} from '../cookies/cookies.service';
import {PERMANENT_STORAGE} from '../../types/tokens';
import {TypeProvider} from '../../types/providerDecoratedType';

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


/**
 * Provider for permanent storage that is using cookie storage implementation
 */
const COOKIE_PERMANENT_STORAGE: Provider =
<ClassProvider>
{
    provide: PERMANENT_STORAGE,
    useClass: CookiePermanentStorageService
};

/**
 * Type that contains provider for cookie permanent storage when used with `providePermanentStorage`
 */
@TypeProvider(COOKIE_PERMANENT_STORAGE)
class CookiePermanentStorageType
{
}

/**
 * Sets permanent storage to use cookie permanent storage when used with `providePermanentStorage`
 */
export const CookiePermanentStorage: PermanentStorageType = CookiePermanentStorageType;