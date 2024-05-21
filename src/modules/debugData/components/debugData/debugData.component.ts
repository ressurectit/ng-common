import {Component, ChangeDetectionStrategy, ElementRef, effect} from '@angular/core';

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
export class DebugDataComponent
{
    //######################### constructor #########################
    constructor(protected debugDataEnabledSvc: DebugDataEnabledService,
                protected element: ElementRef<HTMLElement>)
    {
        effect(() => this.setEnabledCssClass());
    }

    //######################### protected methods #########################

    /**
     * Sets enabled css class according enabled state
     */
    protected setEnabledCssClass(): void
    {
        if(this.debugDataEnabledSvc.enabled())
        {
            this.element.nativeElement.classList.add(ENABLED);
        }
        else
        {
            this.element.nativeElement.classList.remove(ENABLED);
        }
    }
}