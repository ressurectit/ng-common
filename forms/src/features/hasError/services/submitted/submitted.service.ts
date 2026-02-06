import {Injectable, Signal, signal, WritableSignal} from '@angular/core';

/**
 * Service used for handling submitted state of form
 */
@Injectable()
export class SubmittedService
{
    //######################### protected fields #########################

    /**
     * Indication whether was form submitted
     */
    protected submittedSignal: WritableSignal<boolean> = signal(false);

    //######################### public properties #########################

    /**
     * Gets indication whether was form submitted
     */
    public get submitted(): Signal<boolean>
    {
        return this.submittedSignal.asReadonly();
    }

    //######################### public methods #########################

    /**
     * Sets submitted to true
     * @param submitted - If set to false, sets submitted to false
     */
    public setSubmitted(submitted: boolean = true): void
    {
        this.submittedSignal.set(submitted);
    }
}
