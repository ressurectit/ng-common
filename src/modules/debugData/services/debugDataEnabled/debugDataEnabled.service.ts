import {Injectable} from '@angular/core';
import {Subject, Observable} from 'rxjs';

/**
 * Service used for handling enabled state for debug data component
 */
@Injectable({providedIn: 'root'})
export class DebugDataEnabledService
{
    //######################### private fields #########################

    /**
     * Indication whether debug data copmonent is enabled
     */
    private _enabled: boolean = false;

    /**
     * Subject used for emitting changes of enabled state
     */
    private _enabledChangeSubject: Subject<void> = new Subject<void>();

    //######################### public properties #########################

    /**
     * Indication whether debug data copmonent is enabled
     */
    public get enabled(): boolean
    {
        return this._enabled;
    }

    /**
     * Occurs when enabled state changed
     */
    public get enabledChange(): Observable<void>
    {
        return this._enabledChangeSubject.asObservable();
    }

    //######################### public methods #########################

    /**
     * Sets enabled state
     * @param enabled - Indication whether will be enabled state set to true, or false, defaults to true
     */
    public setEnabled(enabled: boolean = true): void
    {
        if(this._enabled === enabled)
        {
            return;
        }

        this._enabled = enabled;

        this._enabledChangeSubject.next();
    }
}