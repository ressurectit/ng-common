import {Directive, ElementRef, Input, OnChanges, OnDestroy, Renderer2, SimpleChanges, booleanAttribute, inject} from '@angular/core';
import {BindThis, nameof} from '@jscrpt/common';

import {TooltipDirective} from '../../modules/tooltip';

/**
 * Directive that is used for displaying text from attached element in tooltip
 */
@Directive(
{
    selector: '[ellipsisTooltip]',
    standalone: true,
    hostDirectives:
    [
        TooltipDirective,
    ],
})
export class EllipsisTooltipSADirective implements OnChanges, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Instance of renderer
     */
    protected renderer: Renderer2 = inject(Renderer2);

    /**
     * Instance of tooltip directive
     */
    protected tooltip: TooltipDirective = inject(TooltipDirective);

    /**
     * HTML element from which is text taken for tooltip
     */
    protected elementValue: HTMLElement = inject(ElementRef).nativeElement;

    /**
     * Instance of mutation observer used for watching 
     */
    protected textObserver: MutationObserver|undefined|null = new MutationObserver(this.updateTooltip);

    /**
     * Original css class
     */
    protected originalCssClass: string|undefined|null;

    //######################### public properties - inputs #########################

    /**
     * Css class appliet to element
     */
    @Input()
    public ellipsisClass: string = 'text-ellipsis';

    /**
     * Tooltip prefix text to be prepended to tooltip read from content
     */
    @Input()
    public tooltipPrefix: string|undefined|null;

    /**
     * Tooltip suffix text to be appended to tooltip read from content
     */
    @Input()
    public tooltipSuffix: string|undefined|null;

    /**
     * Indication whether are html tags allowed in tooltip text
     */
    @Input({transform: booleanAttribute})
    public allowHtml: boolean = false;

    /**
     * Gets or sets HTML element from which is text taken for tooltip
     */
    @Input('ellipsisTooltip')
    public get element(): HTMLElement
    {
        return this.elementValue;
    }
    public set element(value: HTMLElement|ElementRef<HTMLElement>)
    {
        if(!value)
        {
            return;
        }

        if(value instanceof ElementRef)
        {
            this.elementValue = value.nativeElement;

            return;
        }

        this.elementValue = value;
    }

    //######################### public methods - implementation of OnChanges #########################
    
    /**
     * Called when input value changes
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        if(nameof<EllipsisTooltipSADirective>('allowHtml') in changes)
        {
            this.tooltip.allowHtml = this.allowHtml;
        }

        if(nameof<EllipsisTooltipSADirective>('element') in changes ||
           nameof<EllipsisTooltipSADirective>('ellipsisClass') in changes)
        {
            if(this.originalCssClass != this.ellipsisClass)
            {
                if(this.originalCssClass)
                {
                    this.renderer.removeClass(this.element, this.originalCssClass);
                }
    
                this.renderer.addClass(this.element, this.ellipsisClass);
                this.originalCssClass = this.ellipsisClass;
            }

            this.textObserver?.disconnect();
            this.textObserver?.observe(this.element, {characterData: true, subtree: true, childList: true});
        }

        if(nameof<EllipsisTooltipSADirective>('tooltipPrefix') in changes ||
           nameof<EllipsisTooltipSADirective>('tooltipSuffix') in changes)
        {
            this.updateTooltip();
        }
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.textObserver?.disconnect();
        this.textObserver = null;
    }

    //######################### protected methods #########################

    /**
     * Updates tooltip value
     */
    @BindThis
    protected updateTooltip(): void
    {
        let text = this.allowHtml ? this.element.innerHTML : this.element.innerText;

        if(text)
        {
            text = (this.tooltipPrefix ?? '') + text + (this.tooltipSuffix ?? '');
        }

        this.tooltip.tooltip = text;
    }

    //######################### ng language server #########################
    
    /**
     * Custom input type for `element` input
     */
    public static ngAcceptInputType_element: HTMLElement|ElementRef|'';
}