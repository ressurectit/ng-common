import {ComponentRef, ContentChild, Directive, ElementRef, EmbeddedViewRef, HostListener, Inject, Injector, Input, OnChanges, OnDestroy, Optional, SimpleChanges, TemplateRef, ViewContainerRef} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {extend, isBlank, isPresent, nameof} from '@jscrpt/common';

import {TooltipComponent} from '../../components/tooltip/tooltip.component';
import {TooltipOptions, TooltipRenderer} from '../../misc/tooltip.interface';
import {TOOLTIP_OPTIONS} from '../../misc/tokens';
import {applyPositionResult, Position, PositionOffset, PositionPlacement} from '../../../../services/position';
import {TooltipTemplateDirective} from '../tooltipTemplate/tooltipTemplate.directive';
import {POSITION} from '../../../../types/tokens';

/**
 * Default options for tooltip
 */
const defaultOptions: TooltipOptions =
{
    delay: 200,
    position:
    {
        offset: PositionOffset.MouseEnter,
        placement: PositionPlacement.TopStart
    },
    allowSelection: false,
    tooltipRenderer: TooltipComponent,
    tooltipCssClass: null,
    stopPropagation: false
};

/**
 * Directive used for rendering tooltip
 */
@Directive(
{
    selector: '[tooltip]'
})
export class TooltipDirective<TData = any> implements OnChanges, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Instance of component used for rendering tooltip
     */
    protected _tooltipComponent?: ComponentRef<TooltipRenderer<TData>>;

    /**
     * Instance of HTML element for tooltip renderer
     */
    protected _tooltipElement?: HTMLElement;

    /**
     * Instance of options provided for this tooltip
     */
    protected _options: TooltipOptions;

    /**
     * Indication whether there is active show tooltip request
     */
    protected _showRequest: boolean = false;

    /**
     * Indication whether keep open tooltip component
     */
    protected _keepOpen: boolean = false;

    /**
     * Timeout that is used for handling mouse move
     */
    protected _timeout: number|null = null;

    //######################### public properties - inputs #########################

    /**
     * Tooltip text that is displayed, or any data that could be passed to template
     */
    @Input()
    public tooltip?: TData;

    /**
     * Indication whether are html tags allowed in tooltip text
     */
    @Input()
    public allowHtml: boolean = false;

    /**
     * Instance of tooltip template that is used for rendering
     */
    @Input()
    public tooltipTemplate?: TemplateRef<TData>;

    /**
     * Options used for displaying tooltip
     */
    @Input()
    public get tooltipOptions(): Partial<TooltipOptions>
    {
        return this._options;
    }
    public set tooltipOptions(value: Partial<TooltipOptions>)
    {
        this._options = extend(true, {}, this._options, value);
    }

    /**
     * Gets or sets indication whether is tooltip visible, if has boolean value, mouse events cant override this
     */
    @Input()
    public tooltipVisible?: boolean;

    //######################### public properties - children #########################

    /**
     * Instance of template from element content, used for rendering
     */
    @ContentChild(TooltipTemplateDirective)
    public tooltipTemplateChild?: TooltipTemplateDirective;

    //######################### constructor #########################
    constructor(protected _viewContainerRef: ViewContainerRef,
                protected _injector: Injector,
                protected _element: ElementRef<HTMLElement>,
                @Inject(DOCUMENT) protected _document: Document,
                @Inject(POSITION) protected _position: Position,
                @Optional() @Inject(TOOLTIP_OPTIONS) options?: Partial<TooltipOptions>)
    {
        this._options = extend(true, {}, defaultOptions, options);
    }

    //######################### public methods - implementation of OnChanges #########################

    /**
     * Called when input value changes
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        if(nameof<TooltipDirective>('tooltipVisible') in changes)
        {
            if(this.tooltipVisible)
            {
                this._showTooltip();
            }
            else
            {
                this._hideTooltip();
            }
        }
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this._destroyTooltip();
    }

    //######################### public methods - host #########################

    /**
     * Handles mouse leave event, hover ends
     * @param event - Mouse event that occured
     * @internal
     */
    @HostListener('mouseleave', ['$event'])
    public mouseLeave(event: MouseEvent): void
    {
        if(this._options.stopPropagation)
        {
            event.stopPropagation();
        }

        if(isBlank(this.tooltipVisible))
        {
            setTimeout(() =>
            {
                if(!this._keepOpen)
                {
                    this._showRequest = false;
                    this._hideTooltip();
                }
            }, 10);
        }
    }

    /**
     * Handles mouse move event, displaying tooltip
     * @param event - Mouse event that occured
     * @internal
     */
    @HostListener('mousemove', ['$event'])
    public mouseMove(event: MouseEvent): void
    {
        if(this._options.stopPropagation)
        {
            event.stopPropagation();
        }

        this._showRequest = true;

        //do nothing if tooltip is visible
        if(this._tooltipComponent || isPresent(this.tooltipVisible))
        {
            return;
        }

        if(isPresent(this._timeout))
        {
            clearTimeout(this._timeout);
        }

        this._timeout = setTimeout(() =>
        {
            this._timeout = null;

            if(this._showRequest)
            {
                this._showTooltip(event);

                this._showRequest = false;
            }
        }, this._options.delay) as any;
    }

    //######################### protected methods #########################

    /**
     * Shows tooltip
     * @param event - Mouse event
     */
    protected _showTooltip(event?: MouseEvent): void
    {
        this._createTooltip();

        //if element was not created do nothing
        if(!this._tooltipElement)
        {
            return;
        }

        this._showData();

        this._position.placeElement(this._tooltipElement,
                                    this._element.nativeElement,
                                    {
                                        placement: this._options.position.placement,
                                        offset: this._options.position.offset,
                                        flip: true,
                                        mouseEvent: event,
                                        autoUpdate: false
                                    })
            .toPromise()
            .then(result => applyPositionResult(result));
    }

    /**
     * Hides tooltip
     */
    protected _hideTooltip(): void
    {
        this._destroyTooltip();
    }

    /**
     * Destroys tooltip component
     */
    protected _destroyTooltip(): void
    {
        if(this._tooltipComponent)
        {
            this._tooltipComponent.destroy();
            this._tooltipComponent = undefined;
            this._tooltipElement = undefined;
        }
    }

    /**
     * Creates tooltip renderer component
     */
    protected _createTooltip(): void
    {
        // 0. Destroys tooltip if it exists
        this._destroyTooltip();

        // 1. Create a component reference from the component
        this._tooltipComponent = this._viewContainerRef
            .createComponent(this._options.tooltipRenderer,
                             {
                                 injector: this._injector
                             });

        // 3. Get DOM element from component
        this._tooltipElement = (this._tooltipComponent.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;

        // 4. Append DOM element to the body
        this._document.body.appendChild(this._tooltipElement);
    }

    /**
     * Sets data to tooltip component and shows them
     */
    protected _showData(): void
    {
        if(this._tooltipComponent)
        {
            this._tooltipComponent.instance.allowHtml = this.allowHtml;
            this._tooltipComponent.instance.data = this.tooltip;
            this._tooltipComponent.instance.template = this.tooltipTemplate ?? this.tooltipTemplateChild?.template;
            this._tooltipComponent.instance.cssClass = this._options.tooltipCssClass;

            this._tooltipComponent.instance.registerHoverEvents(() =>
                                                                {
                                                                    if(this._options.allowSelection)
                                                                    {
                                                                        this._keepOpen = true;
                                                                        this._showRequest = false;
                                                                    }
                                                                },
                                                                () =>
                                                                {
                                                                    setTimeout(() =>
                                                                    {
                                                                        this._keepOpen = false;

                                                                        if(!this._showRequest)
                                                                        {
                                                                            this._hideTooltip();
                                                                        }

                                                                        this._showRequest = false;
                                                                    }, 5);
                                                                });

            this._tooltipComponent.instance.invalidateVisuals();
        }
    }

    //######################### ng language server #########################
    
    /**
     * Custom input type for `tooltip` input
     */
    public static ngAcceptInputType_tooltip: any;
}