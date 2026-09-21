import {Injectable, Signal, WritableSignal, signal} from '@angular/core';

/**
 * Service used for handling enabled state for debug data component
 */
@Injectable({providedIn: 'root'})
export class DebugDataEnabledService
{
    //######################### protected fields #########################

    /**
     * Indication whether debug data component is enabled
     */
    protected enabledSignal: WritableSignal<boolean> = signal(false);

    //######################### public properties #########################

    /**
     * Indication whether debug data component is enabled
     */
    public get enabled(): Signal<boolean>
    {
        return this.enabledSignal.asReadonly();
    }

    //######################### public methods #########################

    /**
     * Sets enabled state
     * @param enabled - Indication whether will be enabled state set to true, or false, defaults to true
     */
    public setEnabled(enabled: boolean = true): void
    {
        this.enabledSignal.set(enabled);
    }
}
