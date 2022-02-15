import {Component, Input, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Subscription} from 'rxjs';

import {ProgressIndicatorService, DEFAULT_PROGRESS_NAME} from '../../services/progressIndicator.service';

/**
 * Component that is used for displaying global progress indicator
 */
@Component(
{
    selector: "progress-indicator",
    templateUrl: 'progressIndicator.component.html',
    styleUrls: ['progressIndicator.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressIndicatorComponent implements OnDestroy
{
    //######################### private fields #########################
    
    /**
     * Subscription for changes in ProgressIndicatorService
     */
    private _subscription: Subscription|null;
    
    //######################### public properties - template bindings #########################

    /**
     * Applied css classes
     * @internal
     */
    public appliedClass: {[key: string]: boolean} = { "progress-indicator": true };

    /**
     * Array of messages that should be displayed
     * @internal
     */
    public messages: string[];

    //######################### public properties - inputs #########################

    /**
     * Sets css classes that will be applied to indicator
     */
    @Input()
    public set cssClass(cssClass: string)
    {
        this.appliedClass = {};
        this.appliedClass[cssClass] = true;
        this._changeDetector.detectChanges();
    }

    //######################### private properties #########################
    
    /**
     * Sets indication that progress indicator is running
     */
    private set running(running: boolean)
    {
        this.appliedClass["running"] = running;
    };

    //######################### constructor #########################
    constructor(private _service: ProgressIndicatorService,
                private _changeDetector: ChangeDetectorRef)
    {
        this.running = this._service.running[DEFAULT_PROGRESS_NAME];
        this.messages = this._service.messages[DEFAULT_PROGRESS_NAME] || [];

        this._subscription = this._service.stateChange.subscribe(name => 
        {
            if(name == DEFAULT_PROGRESS_NAME)
            {
                this.running = this._service.running[DEFAULT_PROGRESS_NAME];
                this.messages = this._service.messages[DEFAULT_PROGRESS_NAME] || [];

                this._changeDetector.detectChanges();
            }
        });
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if(this._subscription)
        {
            this._subscription.unsubscribe();
            this._subscription = null;
        }
    }
}
