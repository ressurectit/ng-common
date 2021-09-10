import {Injectable} from '@angular/core';
import {Router, NavigationEnd, NavigationError, ResolveStart, NavigationStart} from '@angular/router';
import {isBlank} from '@jscrpt/common';

//TODO: think of complicated redirects between ResolveStart and NavigationEnd

/**
 * Special implementation of router that allows routing with sending complex data to routed component
 */
@Injectable({providedIn: 'platform'})
export class DataRouter<TData = any>
{
    //######################### private fields #########################

    /**
     * Value that is going to be used for next routed data
     */
    private _nextValue: TData = null;

    /**
     * Url path of next route
     */
    private _nextUrlPath: string|null = null;

    /**
     * Promise that resolves into value for current route
     */
    private _valuePromise: Promise<TData>|null = null;

    //######################### public properties #########################

    /**
     * Gets promise that resolves into value for current route
     */
    public get valuePromise(): Promise<TData>
    {
        return this._valuePromise || Promise.resolve(null);
    }

    //######################### constructor #########################
    constructor(private _router: Router)
    {
        this._router.events.subscribe(next =>
        {
            //do not use DataRouter
            if(isBlank(this._nextUrlPath))
            {
                return;
            }

            //if navigation started throw away previous promise
            if(next instanceof NavigationStart)
            {
                this._valuePromise = null;

                return;
            }

            //clears next value and next url after end of navigation
            if(next instanceof NavigationEnd)
            {
                this._nextUrlPath = null;
                this._nextValue = null;

                //if navigated to different route clear value promise
                if(this._nextUrlPath != next.url)
                {
                    this._valuePromise = null;
                }
            }

            //if error throw away data
            if(next instanceof NavigationError)
            {
                this._nextUrlPath = null;
                this._nextValue = null;
                this._valuePromise = Promise.resolve(null);

                return;
            }

            //if not ResolveStart, do nothing
            if(!(next instanceof ResolveStart))
            {
                return;
            }

            //navigating to requested URL
            if(this._nextUrlPath == next.url)
            {
                this._valuePromise = Promise.resolve(this._nextValue);
            }
        });
    }

    //######################### public methods #########################

    /**
     * Navigate based on the provided Route Link DSL. This method also allows you to provide complex data for your route
     * @param linkParams - Link params that are used as for standard router
     * @param routeData - Any type of object that can be passed to your routed component
     * @returns Promise
     */
    public navigate(linkParams: any[], routeData: TData): Promise<boolean>
    {
        this._nextValue = routeData;
        this._nextUrlPath = this._router.createUrlTree(linkParams).toString();

        return this._router.navigate(linkParams);
    }
}
