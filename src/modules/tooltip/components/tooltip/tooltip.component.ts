import {Component, ChangeDetectionStrategy, TemplateRef, ChangeDetectorRef, ElementRef, HostListener} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import {Invalidatable} from '@jscrpt/common';

import {TooltipTemplateContext} from '../../directives';
import {TooltipRenderer} from '../../misc/tooltip.interface';

/**
 * Component used for displaying tooltip content
 * @template TData - Type of data passed to tooltip
 */
@Component(
{
    selector: 'tooltip-popup',
    templateUrl: 'tooltip.component.html',
    styleUrl: 'tooltip.component.css',
    imports:
    [
        NgTemplateOutlet,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipComponent<TData = unknown> implements TooltipRenderer<TData>, Invalidatable
{
    //######################### protected fields #########################

    /**
     * Called when mouse enter tooltip component, hover
     */
    protected enterFn: () => void = () => null;

    /**
     * Called when mouse leaves tooltip component
     */
    protected leaveFn: () => void = () => null;

    //######################### public properties - implementation of TooltipRenderer #########################

    /**
     * Data that are rendered in tooltip
     */
    public data: TData|null|undefined;

    /**
     * Template used for rendering tooltip
     */
    public template: TemplateRef<TooltipTemplateContext<TData>>|null|undefined;

    /**
     * Indication whether are html tags allowed in tooltip text
     */
    public allowHtml: boolean = false;

    /**
     * Css class that is applied to tooltip renderer component
     */
    public cssClass: string|null|undefined;

    //######################### constructor #########################
    constructor(protected changeDetector: ChangeDetectorRef,
                protected element: ElementRef<HTMLElement>)
    {
    }

    //######################### public methods - implementation of TooltipRenderer #########################

    /**
     * Registers handlers that allows reaction to entering or leaving tooltip
     * @param enter - Called when mouse enter tooltip component, hover
     * @param leave - Called when mouse leaves tooltip component
     */
    public registerHoverEvents(enter: () => void, leave: () => void): void
    {
        this.enterFn = enter;
        this.leaveFn = leave;
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
        if(this.cssClass)
        {
            this.element.nativeElement.classList.add(this.cssClass);
        }

        this.changeDetector.detectChanges();
    }

    //######################### protected methods - host #########################

    /**
     * Handles mouse enter event over tooltip
     * @internal
     */
    @HostListener('mouseenter')
    protected mouseEnter(): void
    {
        this.enterFn();
    }

    /**
     * Handles mouse leave event over tooltip
     * @internal
     */
    @HostListener('mouseleave')
    protected mouseLeave(): void
    {
        this.leaveFn();
    }
}
