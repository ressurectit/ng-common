import {Component, ChangeDetectionStrategy, OnDestroy, OnInit, ChangeDetectorRef, ElementRef, signal, WritableSignal} from '@angular/core';
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
    styleUrl: 'debugData.component.css',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DebugDataComponent implements OnDestroy, OnInit
{
    //######################### protected fields #########################

    /**
     * Subscription for changes of debug data enabled
     */
    protected debugDataEnabledChangeSubscription: Subscription|undefined|null;

    //######################### protected properties - template bindings #########################

    /**
     * Indication whether is debug data enabled
     *
     * @internal
     */
    protected enabled: WritableSignal<boolean> = signal(false);

    //######################### constructor #########################
    constructor(protected debugDataEnabledSvc: DebugDataEnabledService,
                protected changeDetector: ChangeDetectorRef,
                protected element: ElementRef<HTMLElement>)
    {
    }

    //######################### public methods - implementation of OnInit #########################

    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this.enabled.set(this.debugDataEnabledSvc.enabled);
        this.setEnabledCssClass();

        this.debugDataEnabledChangeSubscription = this.debugDataEnabledSvc.enabledChange.subscribe(() =>
        {
            this.enabled.set(this.debugDataEnabledSvc.enabled);
            this.setEnabledCssClass();

            this.changeDetector.detectChanges();
        });
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.debugDataEnabledChangeSubscription?.unsubscribe();
        this.debugDataEnabledChangeSubscription = null;
    }

    //######################### protected methods #########################

    /**
     * Sets enabled css class according enabled state
     */
    protected setEnabledCssClass(): void
    {
        if(this.enabled())
        {
            this.element.nativeElement.classList.add(ENABLED);
        }
        else
        {
            this.element.nativeElement.classList.remove(ENABLED);
        }
    }
}