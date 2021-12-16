import {Component, ChangeDetectionStrategy, OnDestroy, OnInit, ChangeDetectorRef, ElementRef} from '@angular/core';
import {Subscription} from 'rxjs';

import {DebugDataEnabledService} from '../../services/debugDataEnabled/debugDataEnabled.service';

/**
 * Name of css class for enabled debug data
 */
const ENABLED = 'enabled';

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
     *
     * @internal
     */
    public enabled: boolean = false;

    //######################### constructor #########################
    constructor(protected _debugDataEnabledSvc: DebugDataEnabledService,
                protected _changeDetector: ChangeDetectorRef,
                protected _element: ElementRef<HTMLElement>)
    {
    }

    //######################### public methods - implementation of OnInit #########################

    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this.enabled = this._debugDataEnabledSvc.enabled;
        this._setEnabledCssClass();

        this._debugDataEnabledChangeSubscription = this._debugDataEnabledSvc.enabledChange.subscribe(() =>
        {
            this.enabled = this._debugDataEnabledSvc.enabled;
            this._setEnabledCssClass();

            this._changeDetector.detectChanges();
        });
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this._debugDataEnabledChangeSubscription?.unsubscribe();
        this._debugDataEnabledChangeSubscription = null;
    }

    //######################### private methods #########################

    /**
     * Sets enabled css class according enabled state
     */
    private _setEnabledCssClass(): void
    {
        if(this.enabled)
        {
            this._element.nativeElement.classList.add(ENABLED);
        }
        else
        {
            this._element.nativeElement.classList.remove(ENABLED);
        }
    }
}