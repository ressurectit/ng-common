import {ApplicationRef, ComponentFactoryResolver, ComponentRef, ContentChild, Directive, ElementRef, EmbeddedViewRef, HostListener, Inject, Injector, Input, OnChanges, OnDestroy, Optional, SimpleChanges, TemplateRef} from '@angular/core';
import {extend, isBlank, isPresent, nameof} from '@jscrpt/common';

import {TooltipComponent} from '../../components';
import {TooltipOptions, TooltipRenderer} from '../../misc/tooltip.interface';
import {TOOLTIP_OPTIONS} from '../../misc';
import {positionsWithFlip} from '../../../../misc/utils';

/**
 * Default options for tooltip
 */
const defaultOptions: TooltipOptions =
{
    delay: 200,
    elementPositionAt: 'top left',
    tooltipPosition: 'bottom left',
    fixedPosition: false,
    allowSelection: false,
    tooltipRenderer: TooltipComponent,
    tooltipCssClass: null
};

/**
 * Directive used for rendering tooltip
 */
@Directive(
{
    selector: "[tooltip]"
})
export class TooltipDirective<TData = any> implements OnChanges, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Instance of component used for rendering tooltip
     */
    protected _tooltipComponent?: ComponentRef<TooltipRenderer>;

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
    public tooltip?: TData|string;

    /**
     * Indication whether are html tags allowed in tooltip text
     */
    @Input()
    public allowHtml: boolean = false;

    /**
     * Instance of tooltip template that is used for rendering
     */
    @Input()
    public tooltipTemplate?: TemplateRef<any>;

    /**
     * Options used for displaying tooltip
     */
    @Input()
    public get tooltipOptions(): TooltipOptions
    {
        return this._options;
    }
    public set tooltipOptions(value: TooltipOptions)
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
    @ContentChild('tooltipTemplate')
    public tooltipTemplateChild?: TemplateRef<any>;

    //######################### constructor #########################
    constructor(protected _componentFactoryResolver: ComponentFactoryResolver,
                protected _appRef: ApplicationRef,
                protected _injector: Injector,
                protected _element: ElementRef<HTMLElement>,
                @Optional() @Inject(TOOLTIP_OPTIONS) options: TooltipOptions)
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
    public ngOnDestroy()
    {
        this._destroyTooltip();
    }

    //######################### public methods - host #########################

    /**
     * Handles mouse leave event, hover ends
     * @internal
     */
    @HostListener('mouseleave')
    public mouseLeave()
    {
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
    public mouseMove(event: MouseEvent)
    {
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
                this._showTooltip(event.clientX);

                this._showRequest = false;
            }
        }, this._options.delay) as any;
    }

    //######################### protected methods #########################

    /**
     * Shows tooltip
     * @param xCoordinate - X coordinate of mouse event in viewport
     */
    protected _showTooltip(xCoordinate?: number)
    {
        this._createTooltip();
        this._showData();
        positionsWithFlip(this._tooltipElement, this._options.tooltipPosition, this._element.nativeElement, this._options.elementPositionAt);

        if(xCoordinate && !this._options.fixedPosition)
        {
            this._tooltipElement.style.left = `${xCoordinate}px`;
        }
    }

    /**
     * Hides tooltip
     */
    protected _hideTooltip()
    {
        this._destroyTooltip();
    }

    /**
     * Destroys tooltip component
     */
    protected _destroyTooltip()
    {
        if(this._tooltipComponent)
        {
            this._appRef.detachView(this._tooltipComponent.hostView);
            this._tooltipComponent.destroy();
            this._tooltipComponent = null;
            this._tooltipElement = null;
        }
    }

    /**
     * Creates tooltip renderer component
     */
    protected _createTooltip()
    {
        // 0. Destroyes absolute popup if it exists
        this._destroyTooltip();

        // 1. Create a component reference from the component
        this._tooltipComponent = this._componentFactoryResolver
            .resolveComponentFactory(this._options.tooltipRenderer)
            .create(this._injector);

        // 2. Attach component to the appRef so that it's inside the ng component tree
        this._appRef.attachView(this._tooltipComponent.hostView);

        // 3. Get DOM element from component
        this._tooltipElement = (this._tooltipComponent.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;

        // 4. Append DOM element to the body
        document.body.appendChild(this._tooltipElement);
    }

    /**
     * Sets data to tooltip component and shows them
     */
    protected _showData()
    {
        if(this._tooltipComponent)
        {
            this._tooltipComponent.instance.allowHtml = this.allowHtml;
            this._tooltipComponent.instance.data = this.tooltip;
            this._tooltipComponent.instance.template = this.tooltipTemplate ?? this.tooltipTemplateChild;
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
}