import {Optional, Injectable, PLATFORM_ID, Inject} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {isPresent, isBoolean, isBlank} from '@jscrpt/common';
import {Observable, Subject} from 'rxjs';

import {ProgressIndicatorOptions} from './progressIndicatorOptions';

/**
 * Name of group for global progress indicator
 */
export const DEFAULT_PROGRESS_NAME = "GLOBAL_PROGRESS";

/**
 * Description of running requests group
 */
interface RunningProgressGroup
{
    /**
     * Number of currently running requests for this progress group
     */
    runningRequests: number;

    /**
     * Indication that progress is running for this progress group
     */
    running: boolean;

    /**
     * Array of messages to be displayed for this progress group
     */
    messages?: string[];

    /**
     * Id of running timeout for this progress group
     */
    timeout?: any;
}

/**
 * Service that is used for displaying and hiding progress indicator
 */
@Injectable({providedIn: 'root'})
export class ProgressIndicatorService
{
    //######################### private fields #########################

    /**
     * Indication that current code is running in browser
     */
    private _isBrowser: boolean = isPlatformBrowser(this._platformId);

    /**
     * Information about running progress for each group
     */
    private _runningRequests: {[group: string]: RunningProgressGroup} = {};

    /**
     * Used for invoking stateChange when state of one of progress groups have changed, passing name of group as parameter
     */
    private _stateChange: Subject<string> = new Subject<string>();

    /**
     * Object storing registered overlay groups
     */
    private _registeredOverlays: {[group: string]: number} = {};

    //######################### public properties #########################

    /**
     * Indications that progress is running for each group
     */
    public running: {[group: string]: boolean} = {};

    /**
     * Messages for each group
     */
    public messages: {[group: string]: string[]} = {};

    /**
     * Occurs when state of one of progress groups have changed, passing name of group as parameter
     */
    public get stateChange(): Observable<string>
    {
        return this._stateChange.asObservable();
    }

    //######################### constructors #########################
    constructor(@Inject(PLATFORM_ID) private _platformId: Object,
                @Optional() public config?: ProgressIndicatorOptions)
    {
        if(config && !(config instanceof ProgressIndicatorOptions))
        {
            this.config = undefined;
            console.warn("Provided configuration for 'ProgressIndicatorService' is not of type 'ProgressIndicatorOptions' and will be ignored!");
        }

        this._runningRequests[DEFAULT_PROGRESS_NAME] =
        {
            runningRequests: 0,
            running: false,
            messages: null,
            timeout: null
        };

        this._updateState();

        this.config = config || new ProgressIndicatorOptions();
    }

    //######################### public methods #########################

    /**
     * Displays progress indicator after short delay
     */
    public showProgress(): void;

    /**
     * Displays progress indicator after short delay
     * @param name - Name of progress group (separate counter)
     */
    public showProgress(name: string): void;

    /**
     * Displays progress indicator after short delay
     * @param messages - Array of messages to display what is happening
     */
    public showProgress(messages: string[]): void;

    /**
     * Displays progress indicator after short delay
     * @param name - Name of progress group (separate counter)
     * @param messages - Array of messages to display what is happening
     */
    public showProgress(name: string, messages: string[]): void;

    /**
     * Displays progress indicator after short delay
     * @param nameOrMessages - Name of progress group (separate counter) or Array of messages to display what is happening
     * @param messages - Array of messages to display what is happening
     */
    public showProgress(nameOrMessages?: string|string[], messages?: string[]): void
    {
        if(!this._isBrowser)
        {
            return;
        }

        let name: string = DEFAULT_PROGRESS_NAME;

        //first parameter is present
        if(isPresent(nameOrMessages))
        {
            if(Array.isArray(nameOrMessages))
            {
                messages = nameOrMessages;
            }
            else
            {
                name = nameOrMessages;
            }
        }

        name = this._getName(name);

        let group = this._getGroup(name);

        group.messages = [...(group.messages || []), ...(messages && messages.length ? messages : [])];

        if(!group.timeout && group.runningRequests < 1)
        {
            group.timeout = setTimeout(() =>
            {
                this._onRunning(name, true, group.messages);

                clearTimeout(group.timeout);
                group.timeout = null;
            }, this.config.timeout);
        }

        group.runningRequests++;
    }

    /**
     * Hides progress indicator
     */
    public hideProgress(): void;

    /**
     * Hides progress indicator
     * @param name - Name of progress group (separate counter)
     */
    public hideProgress(name: string): void;

    /**
     * Hides progress indicator
     * @param force - Indication that indicator should be hidden even if some processes are running
     */
    public hideProgress(force: boolean): void;

    /**
     * Hides progress indicator
     * @param name - Name of progress group (separate counter)
     * @param force - Indication that indicator should be hidden even if some processes are running
     */
    public hideProgress(name: string, force: boolean): void;

    /**
     * Hides progress indicator
     * @param nameOrForce - Name of progress group (separate counter) or Indication that indicator should be hidden even if some processes are running
     * @param force - Indication that indicator should be hidden even if some processes are running
     */
    public hideProgress(nameOrForce?: boolean | string, force?: boolean): void
    {
        if(!this._isBrowser)
        {
            return;
        }

        let name: string = DEFAULT_PROGRESS_NAME;

        //first parameter is present
        if(isPresent(nameOrForce))
        {
            if(isBoolean(nameOrForce))
            {
                force = nameOrForce as boolean;
            }
            else
            {
                name = nameOrForce as string;
            }
        }

        name = this._getName(name);

        let group = this._getGroup(name);

        if(force)
        {
            group.runningRequests = 0;
        }

        if(group.runningRequests > 0)
        {
            group.runningRequests--;
        }

        if(group.runningRequests < 1)
        {
            clearTimeout(group.timeout);
            group.timeout = null;
            this._onRunning(name, false, null);
        }
    }

    /**
     * Adds message to progress indicator group
     * @param message - Message to display what is happening
     */
    public addMessage(message: string): void;

    /**
     * Adds message to progress indicator group
     * @param name - Name of progress group (separate counter)
     * @param message - Message to display what is happening
     */
    public addMessage(name: string, message?: string): void;

    /**
     * Adds message to progress indicator group
     * @param nameOrMessage - Name of progress group (separate counter) or Message to display what is happening
     * @param message - Message to display what is happening
     */
    public addMessage(nameOrMessage?: string, message?: string): void
    {
        let name: string = DEFAULT_PROGRESS_NAME;

        if(isPresent(message))
        {
            name = nameOrMessage;
        }
        else
        {
            message = nameOrMessage;
        }

        name = this._getName(name);

        let group = this._getGroup(name);

        this._onRunning(name, group.running, [...(group.messages || []), message]);
    }

    /**
     * Clears all messages for progress group
     * @param name - Name of progress group (separate counter)
     */
    public clearMessages(name?: string): void
    {
        if(isBlank(name))
        {
            name = DEFAULT_PROGRESS_NAME;
        }

        name = this._getName(name);

        let group = this._getGroup(name);

        this._onRunning(name, group.running, null);
    }

    /**
     * Registers overlay group
     * @param name - Name of group to be registered
     * @internal
     */
    public registerOverlayGroup(name: string): void
    {
        if(!this._registeredOverlays[name])
        {
            this._registeredOverlays[name] = 0;
        }

        this._registeredOverlays[name]++;
    }

    /**
     * Unregisters overlay group
     * @param name - Name of group to be unregistered
     * @internal
     */
    public unregisterOverlayGroup(name: string): void
    {
        if(!this._registeredOverlays[name])
        {
            return;
        }

        this._registeredOverlays[name]--;

        if(this._registeredOverlays[name] <= 0)
        {
            delete this._registeredOverlays[name];
        }
    }

    //######################### private methods #########################

    /**
     * Gets name of group based on existance of this group
     * @param name - Name of group that is requested
     */
    private _getName(name): string
    {
        if(name == DEFAULT_PROGRESS_NAME || !this.config.fallbackToDefault)
        {
            return name;
        }

        if(this._registeredOverlays[name])
        {
            return name;
        }

        return DEFAULT_PROGRESS_NAME;
    }

    /**
     * Used for invoking 'stateChange' event
     * @param name - Name of group which has changes its state
     * @param value - Value whether is progress running
     * @param messages - Messages to be displayed for this group
     */
    private _onRunning(name: string, value: boolean, messages: string[])
    {
        let group = this._getGroup(name);

        group.running = value;
        group.messages = messages;

        this._updateState();
        this._stateChange.next(name);
    }

    /**
     * Updates state of progress indicator service
     */
    private _updateState()
    {
        let running: {[group: string]: boolean} = {};
        let messages: {[group: string]: string[]} = {};

        Object.keys(this._runningRequests).forEach(group =>
        {
            running[group] = this._runningRequests[group].running;
            messages[group] = this._runningRequests[group].messages;
        });

        this.running = running;
        this.messages = messages;
    }

    /**
     * Gets object for progress group
     * @param name - Name of group to be obtained
     */
    private _getGroup(name: string): RunningProgressGroup
    {
        let group = this._runningRequests[name];

        if(isPresent(group))
        {
            return group;
        }

        group =
        {
            runningRequests: 0,
            running: false,
            messages: null,
            timeout: null
        };

        this._runningRequests[name] = group;

        return group;
    }
}
