import {Injectable, Signal, signal, ViewContainerRef, WritableSignal} from '@angular/core';

/**
 * Service used as register for validation errors view container
 */
@Injectable()
export class ValidationErrorsViewContainerRegister
{
    //######################### protected fields #########################

    /**
     * View container used for rendering validation errors
     */
    protected readonly viewContainerValue: WritableSignal<ViewContainerRef|undefined|null> = signal(null);

    //######################### public properties #########################

    /**
     * Gets view container used for rendering validation errors
     */
    public get viewContainer(): Signal<ViewContainerRef>
    {
        return this.viewContainerValue.asReadonly();
    }

    //######################### public methods #########################

    /**
     * Sets view container to register
     * @param viewContainer - View container to be set
     */
    public setViewContainer(viewContainer: ViewContainerRef): void
    {
        this.viewContainerValue.set(viewContainer);
    }
}
