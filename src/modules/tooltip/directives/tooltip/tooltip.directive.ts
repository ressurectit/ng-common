import {ComponentRef, ContentChild, Directive, ElementRef, EmbeddedViewRef, HostListener, Inject, Injector, Input, OnChanges, OnDestroy, Optional, SimpleChanges, SkipSelf, TemplateRef, ViewContainerRef} from '@angular/core';
import {AnimationBuilder, AnimationFactory} from '@angular/animations';
import {DOCUMENT} from '@angular/common';
import {fadeInAnimation, fadeOutAnimation} from '@anglr/animations';
import {RecursivePartial, isBlank, isPresent, nameof, renderToBody} from '@jscrpt/common';
import {extend} from '@jscrpt/common/extend';
import {lastValueFrom} from 'rxjs';

import {TooltipComponent} from '../../components/tooltip/tooltip.component';
import {TooltipOptions, TooltipRenderer} from '../../misc/tooltip.interface';
import {TOOLTIP_OPTIONS} from '../../misc/tokens';
import {applyPositionResult, Position, PositionPlacement} from '../../../../services/position';
import {TooltipTemplateDirective} from '../tooltipTemplate/tooltipTemplate.directive';
import {TooltipTemplateContext} from '../tooltipTemplate/tooltipTemplate.context';
import {POSITION} from '../../../../types/tokens';

/**
 * Default options for tooltip
 */
const defaultOptions: TooltipOptions =
{
    delay: 200,
    position:
    {
        offset: 'MouseEnter',
        placement: PositionPlacement.TopEnd,
    },
    allowSelection: false,
    tooltipRenderer: TooltipComponent,
    tooltipCssClass: null,
    stopPropagation: true,
    enterAnimation: fadeInAnimation,
    exitAnimation: fadeOutAnimation,
    containerElement: undefined,
};

/**
 * Directive used for rendering tooltip
 */
@Directive(
{
    selector: '[tooltip]',
})
export class TooltipDirective<TData = unknown> implements OnChanges, OnDestroy
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
     * Animation factory used for enter animation of tooltip
     */
    protected _enterAnimation: AnimationFactory;

    /**
     * Animation factory used for exit animation of tooltip
     */
    protected _exitAnimation: AnimationFactory;

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
    public template?: TemplateRef<TooltipTemplateContext<TData>>;

    /**
     * Options used for displaying tooltip
     */
    @Input()
    public get tooltipOptions(): RecursivePartial<TooltipOptions>
    {
        return this._options;
    }
    public set tooltipOptions(value: RecursivePartial<TooltipOptions>)
    {
        this._options = extend(true, {}, this._options, value);

        this._enterAnimation = this._animationsPlayer.build(this._options.enterAnimation);
        this._exitAnimation = this._animationsPlayer.build(this._options.exitAnimation);

        if(this._options.containerElement && !this.containerElement)
        {
            this.containerElement = this._options.containerElement;
        }
    }

    /**
     * Gets or sets indication whether is tooltip visible, if has boolean value, mouse events cant override this
     */
    @Input()
    public tooltipVisible?: boolean;

    /**
     * String that defines element in which should be tooltip rendered, if not specified, body is used
     * 
     * Allows also css classes to be specified (div.body-box)
     */
    @Input()
    public containerElement: string|undefined|null;

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
                protected _animationsPlayer: AnimationBuilder,
                @Inject(DOCUMENT) protected _document: Document,
                @Inject(POSITION) protected _position: Position<HTMLElement>,
                @Optional() @SkipSelf() protected _parent?: TooltipDirective|null,
                @Optional() @Inject(TOOLTIP_OPTIONS) options?: Partial<TooltipOptions>,)
    {
        this._options = extend(true, {}, defaultOptions, options);

        this._enterAnimation = this._animationsPlayer.build(this._options.enterAnimation);
        this._exitAnimation = this._animationsPlayer.build(this._options.exitAnimation);

        if(this._options.containerElement)
        {
            this.containerElement = this._options.containerElement;
        }
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
        if(this._timeout)
        {
            clearTimeout(this._timeout);
        }

        this._destroyTooltip();
    }

    //######################### protected methods - host #########################

    /**
     * Handles mouse leave event, hover ends
     * @param event - Mouse event that occured
     */
    @HostListener('mouseleave', ['$event'])
    protected mouseLeave(event: MouseEvent): void
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
     */
    @HostListener('mousemove', ['$event'])
    protected mouseMove(event: MouseEvent): void
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
        //no data for tooltip or no template
        if(!this.tooltip && !this.template && !this.tooltipTemplateChild)
        {
            return;
        }

        this._parent?._hideTooltip();
        this._createTooltip();

        //if element was not created do nothing
        if(!this._tooltipElement)
        {
            return;
        }

        this._showData();

        lastValueFrom(this._position.placeElement(this._tooltipElement,
                                                  this._element.nativeElement,
                                                  {
                                                      placement: this._options.position.placement,
                                                      offset: this._options.position.offset,
                                                      flip: true,
                                                      mouseEvent: event,
                                                      autoUpdate: false
                                                  }))
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
            const component = this._tooltipComponent;
            const element = this._tooltipElement;

            const exitAnimation = this._exitAnimation.create(element);

            exitAnimation.onDone(() =>
            {
                component.destroy();
                exitAnimation.destroy();
            });
            
            this._tooltipComponent = undefined;
            this._tooltipElement = undefined;

            exitAnimation.play();
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
        renderToBody(this._document, this._tooltipElement, this.containerElement);
        this._enterAnimation.create(this._tooltipElement).play();
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
            this._tooltipComponent.instance.template = this.template ?? this.tooltipTemplateChild?.template;
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