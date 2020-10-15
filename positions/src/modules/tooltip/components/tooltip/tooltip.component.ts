import {Component, ChangeDetectionStrategy, TemplateRef, ChangeDetectorRef, HostBinding, ElementRef} from '@angular/core';
import {fadeInOutTrigger} from '@anglr/animations';

import {TooltipRenderer} from '../../misc/tooltip.interface';

/**
 * Component used for displaying tooltip content
 */
@Component(
{
    selector: 'tooltip-popup',
    templateUrl: 'tooltip.component.html',
    styleUrls: ['tooltip.component.scss'],
    animations: [fadeInOutTrigger],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipComponent<TData = any> implements TooltipRenderer<TData>
{
    //######################### public properties - implementation of TooltipRenderer #########################

    /**
     * Data that are rendered in tooltip
     */
    public data: TData|null;

    /**
     * Template used for rendering tooltip
     */
    public template: TemplateRef<TData>|null;

    /**
     * Indication whether are html tags allowed in tooltip text
     */
    public allowHtml: boolean;

    /**
     * Css class that is applied to tooltip renderer component
     */
    public cssClass: string|null;

    //######################### public properties - host #########################

    /**
     * Attach fade in/out animation to element
     * @internal
     */
    @HostBinding('@fadeInOut')
    public animation: boolean = true;

    //######################### constructor #########################
    constructor(protected _changeDetector: ChangeDetectorRef,
                protected _element: ElementRef<HTMLElement>)
    {
    }

    //######################### public methods - implementation of TooltipRenderer #########################

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals(): void
    {
        if(this.cssClass)
        {
            this._element.nativeElement.classList.add(this.cssClass);
        }

        this._changeDetector.detectChanges();
    }
}