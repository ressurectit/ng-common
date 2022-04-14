import {ViewContainerRef} from '@angular/core';
import {Observable, Subject} from 'rxjs';

/**
 * Class that holds validation errors view container
 */
export class ValidationErrorsContainerView
{
    //######################### private fields #########################
    
    /**
     * Current instance of view container
     */
    private _viewContainer: ViewContainerRef;
    
    /**
     * Used for emitting viewContainer changes
     */
    private _viewContainerChange: Subject<void> = new Subject<void>();
    
    //######################### public properties #########################
    
    /**
     * Gets or sets current instance of view container
     */
    public get viewContainer(): ViewContainerRef
    {
        return this._viewContainer;
    }
    public set viewContainer(value: ViewContainerRef)
    {
        this._viewContainer = value;
        this._viewContainerChange.next();
    }

    /**
     * Occurs when view container instance changes
     */
    public get viewContainerChange(): Observable<void>
    {
        return this._viewContainerChange.asObservable();
    }
}