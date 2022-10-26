import {Directive, Input, ElementRef, OnChanges, SimpleChanges, Inject, Output, EventEmitter, OnDestroy} from '@angular/core';
import {nameof, isPresent, isString, Func1, NoopAction} from '@jscrpt/common';

import {applyPositionResult, Position, PositionPlacement, PositionOptions, PositionOffsetString, PositionOffsets, PositionArguments, AutoUpdateOptions} from '../../../../services/position';
import {POSITION} from '../../../../types/tokens';

/**
 * Sets position of attached element relative to provided element
 */
@Directive(
{
    selector: '[positionTo]'
})
export class PositionToDirective implements OnChanges, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Position placement value
     */
    protected ɵPlacement: PositionPlacement|undefined|null;

    /**
     * Html element which is used as source for positioning
     */
    protected ɵSource: HTMLElement|undefined|null;

    /**
     * Method used for disposing auto positioning
     */
    protected dispose: NoopAction|undefined|null;

    //######################### public properties - inputs #########################

    /**
     * Gets or sets html element which is used as source for positioning
     */
    @Input('positionTo')
    public get source(): HTMLElement|undefined|null
    {
        return this.ɵSource;
    }
    public set source(value: HTMLElement|undefined|null)
    {
        if(value instanceof ElementRef)
        {
            this.ɵSource = (value as ElementRef).nativeElement;

            return;
        }

        this.ɵSource = value;
    }

    /**
     * Gets or sets position placement value
     */
    @Input()
    public get placement(): PositionPlacement|undefined|null
    {
        return this.ɵPlacement;
    }
    public set placement(value: PositionPlacement|undefined|null)
    {
        if(isString(value))
        {
            this.ɵPlacement = PositionPlacement[value as keyof typeof PositionPlacement];

            return;
        }

        this.ɵPlacement = value;
    }

    /**
     * Offset which allows moving target element along the cross axis of placement, or any chosed direction
     */
    @Input()
    public offset: PositionOffsetString|number|PositionOffsets|Func1<number|PositionOffsets, PositionArguments> = 'None';

    /**
     * Indication whether set up 'auto updating' of position
     */
    @Input()
    public autoUpdate: boolean|AutoUpdateOptions = true;

    //######################### public properties - outputs #########################

    /**
     * Occurs when flip occurs during positioning
     */
    @Output()
    public flip: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Occurs when element was positioned
     */
    @Output()
    public done: EventEmitter<void> = new EventEmitter<void>();

    //######################### constructor #########################
    constructor(protected target: ElementRef<HTMLElement>,
                @Inject(POSITION) protected position: Position)
    {
    }

    //######################### public methods - implementation of OnChanges #########################

    /**
     * Called when input value changes
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        if((nameof<PositionToDirective>('source') in changes ||
            nameof<PositionToDirective>('placement') in changes) &&
           isPresent(this.source))
        {
            this._applyPosition();
        }
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.dispose?.();
    }

    //######################### protected methods #########################

    /**
     * Applies position according to specified parameters to specified elements
     */
    protected _applyPosition(): void
    {
        if(!this.ɵSource)
        {
            return;
        }

        const options: Partial<PositionOptions> =
        {
            flip: true,
            autoUpdate: this.autoUpdate,
            offset: this.offset,
        };

        if(this.ɵPlacement)
        {
            options.placement = this.ɵPlacement;
        }

        this.dispose?.();

        this.position.placeElement(this.target.nativeElement,
                                    this.ɵSource,
                                    options)
            .subscribe(result =>
            {
                this.dispose = result.dispose;

                applyPositionResult(result);

                if(result.flip)
                {
                    this.flip.emit();
                }

                this.done.emit();
            });
    }

    //######################### ng language server #########################

    /**
     * Custom input type for `placement` input
     */
    public static ngAcceptInputType_placement: PositionPlacement|undefined|null|keyof typeof PositionPlacement;

    //######################### ng language server #########################

    /**
     * Custom input type for `source` input
     */
    public static ngAcceptInputType_source: HTMLElement|ElementRef<HTMLElement>;
}
