import {Component, ChangeDetectionStrategy, TemplateRef, ChangeDetectorRef, HostBinding, ElementRef, HostListener} from '@angular/core';
import {transition, trigger, useAnimation} from '@angular/animations';
import {fadeInAnimation, fadeOutAnimation} from '@anglr/animations';

import {TooltipRenderer} from '../../misc/tooltip.interface';

/**
 * Component used for displaying tooltip content
 */
@Component(
{
    selector: 'tooltip-popup',
    templateUrl: 'tooltip.component.html',
    styleUrls: ['tooltip.component.css'],
    animations:
    [
        trigger('fadeInOut',
        [
            transition(':enter', 
            [
                useAnimation(fadeInAnimation, {params: {duration: '260ms'}})
            ]),
            transition(':leave', 
            [
                useAnimation(fadeOutAnimation, {params: {duration: '260ms'}})
            ])
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipComponent<TData = any> implements TooltipRenderer<TData>
{
    //######################### protected fields #########################

    /**
     * Called when mouse enter tooltip component, hover
     */
    protected _enterFn: () => void = () => null;

    /**
     * Called when mouse leaves tooltip component
     */
    protected _leaveFn: () => void = () => null;

    //######################### public properties - implementation of TooltipRenderer #########################

    /**
     * Data that are rendered in tooltip
     */
    public data: TData|null|undefined;

    /**
     * Template used for rendering tooltip
     */
    public template: TemplateRef<TData>|null|undefined;

    /**
     * Indication whether are html tags allowed in tooltip text
     */
    public allowHtml: boolean = false;

    /**
     * Css class that is applied to tooltip renderer component
     */
    public cssClass: string|null|undefined;

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
     * Registers handlers that allows reaction to entering or leaving tooltip
     * @param enter - Called when mouse enter tooltip component, hover
     * @param leave - Called when mouse leaves tooltip component
     */
    public registerHoverEvents(enter: () => void, leave: () => void): void
    {
        this._enterFn = enter;
        this._leaveFn = leave;
    }

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

    //######################### public methods - host #########################

    /**
     * Handles mouse enter event over tooltip
     * @internal
     */
    @HostListener('mouseenter')
    public mouseEnter(): void
    {
        this._enterFn();
    }

    /**
     * Handles mouse leave event over tooltip
     * @internal
     */
    @HostListener('mouseleave')
    public mouseLeave(): void
    {
        this._leaveFn();
    }
}