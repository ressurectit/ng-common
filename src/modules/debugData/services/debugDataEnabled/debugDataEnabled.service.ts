import {Injectable, Signal, WritableSignal, signal} from '@angular/core';

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
    private _enabled: WritableSignal<boolean> = signal(false);

    //######################### public properties #########################

    /**
     * Indication whether debug data copmonent is enabled
     */
    public get enabled(): Signal<boolean>
    {
        return this._enabled.asReadonly();
    }

    //######################### public methods #########################

    /**
     * Sets enabled state
     * @param enabled - Indication whether will be enabled state set to true, or false, defaults to true
     */
    public setEnabled(enabled: boolean = true): void
    {
        this._enabled.set(enabled);
    }
}