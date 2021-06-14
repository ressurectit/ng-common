import {Component, ChangeDetectionStrategy, OnDestroy, OnInit, ChangeDetectorRef} from "@angular/core";
import {Subscription} from "rxjs";

import {DebugDataEnabledService} from "../../services/debugDataEnabled/debugDataEnabled.service";

/**
 * Component used for displaying debug data
 */
@Component(
{
    selector: 'debug-data',
    templateUrl: 'debugData.component.html',
    styleUrls: ['debugData.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DebugDataComponent implements OnDestroy, OnInit
{
    //######################### protected fields #########################

    /**
     * Subscription for changes of debug data enabled
     */
    protected _debugDataEnabledChangeSubscription: Subscription;

    //######################### public properties - template bindings #########################

    /**
     * Indication whether is debug data enabled
     */
    public enabled: boolean = false;

    //######################### constructor #########################
    constructor(protected _debugDataEnabledSvc: DebugDataEnabledService,
                protected _changeDetector: ChangeDetectorRef)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit()
    {
        this.enabled = this._debugDataEnabledSvc.enabled;

        this._debugDataEnabledChangeSubscription = this._debugDataEnabledSvc.enabledChange.subscribe(() =>
        {
            this.enabled = this._debugDataEnabledSvc.enabled;
            this._changeDetector.detectChanges();
        });
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        this._debugDataEnabledChangeSubscription?.unsubscribe();
        this._debugDataEnabledChangeSubscription = null;
    }
}