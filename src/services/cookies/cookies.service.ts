import {PLATFORM_ID, Inject, Optional, Injectable} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {isBlank} from '@js/common';

import {SERVER_COOKIE_HEADER} from '../../types/tokens';

/**
 * Class that is used as wrapper for working with cookies
 */
@Injectable({providedIn: 'root'})
export class CookieService
{
    //######################### private fields #########################

    /**
     * Indication that current code is running in browser
     */
    private _isBrowser: boolean = false;

    //######################### constructor #########################
    constructor(@Inject(PLATFORM_ID) platformId: Object,
                @Optional() @Inject(SERVER_COOKIE_HEADER) private _serverCookies: string)
    {
        this._isBrowser = isPlatformBrowser(platformId);
    }

    //######################### public methods #########################

    /**
     * Retrieves a single cookie by it's name
     *
     * @param  {string} name Identification of the Cookie
     * @returns The Cookie's value
     */
    public getCookie(name: string): any
    {
        if(!this._isBrowser && isBlank(this._serverCookies))
        {
            return null;
        }

        name = encodeURIComponent(name);
        
        let regexp = new RegExp('(?:^' + name + '|;\\s*' + name + ')=(.*?)(?:;|$)', 'g');
        let result;

        if(isBlank(this._serverCookies))
        {
            result = regexp.exec(document.cookie);
        }
        else
        {
            result = regexp.exec(this._serverCookies);
        }
        
        return (result === null) ? null : JSON.parse(decodeURIComponent(result[1]));
    }

    /**
     * Save the Cookie
     *
     * @param  {string} name Cookie's identification
     * @param  {any} value Cookie's value
     * @param  {number} expires Cookie's expiration date in days from now. If it's undefined the cookie is a session Cookie
     * @param  {string} path Path relative to the domain where the cookie should be avaiable. Default /
     * @param  {string} domain Domain where the cookie should be avaiable. Default current domain
     */
    public setCookie(name: string, value: any, expires?: number, path?: string, domain?: string)
    {
        if(!this._isBrowser)
        {
            return;
        }

        let cookieStr = encodeURIComponent(name) + '=' + encodeURIComponent(JSON.stringify(value)) + ';';

        if (expires)
        {
            let dtExpires = new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24);
            cookieStr += 'expires=' + dtExpires.toUTCString() + ';';
        }
        
        if (path)
        {
            cookieStr += 'path=' + path + ';';
        }
        
        if (domain)
        {
            cookieStr += 'domain=' + domain + ';';
        }

        document.cookie = cookieStr;
    }

    /**
     * Removes specified Cookie
     *
     * @param  {string} name Cookie's identification
     * @param  {string} path Path relative to the domain where the cookie should be avaiable. Default /
     * @param  {string} domain Domain where the cookie should be avaiable. Default current domain
     */
    public deleteCookie(name: string, path?: string, domain?: string)
    {
        if(!this._isBrowser)
        {
            return;
        }

        // If the cookie exists
        if (this.getCookie(name))
        {
            this.setCookie(name, '', -1, path, domain);
        }
    }
}