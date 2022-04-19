import {Directive, Input, ElementRef, OnChanges, SimpleChanges, Inject, Output, EventEmitter} from '@angular/core';
import {nameof, isPresent, isString} from '@jscrpt/common';

import {applyPositionResult, Position, PositionPlacement, PositionOptions} from '../../../../services/position';
import {POSITION} from '../../../../types/tokens';

/**
 * Sets position of attached element relative to provided element
 */
@Directive(
{
    selector: '[positionTo]'
})
export class PositionToDirective implements OnChanges
{
    //######################### protected fields #########################

    /**
     * Position placement value
     */
    protected _placement: PositionPlacement|null|undefined;

    /**
     * Html element which is used as source for positioning
     */
    protected _source!: HTMLElement;

    //######################### public properties - inputs #########################

    /**
     * Gets or sets html element which is used as source for positioning
     */
    @Input('positionTo')
    public get source(): HTMLElement
    {
        return this._source;
    }
    public set source(value: HTMLElement)
    {
        if(value instanceof ElementRef)
        {
            this._source = (value as ElementRef).nativeElement;

            return;
        }

        this._source = value;
    }

    /**
     * Gets or sets position placement value
     */
    @Input()
    public get placement(): PositionPlacement|null|undefined
    {
        return this._placement;
    }
    public set placement(value: PositionPlacement|null|undefined)
    {
        if(isString(value))
        {
            this._placement = PositionPlacement[value as keyof typeof PositionPlacement];

            return;
        }

        this._placement = value;
    }

    // //######################### public properties - outputs #########################

    /**
     * Occurs when flip occurs during positioning
     */
    @Output()
    public flip: EventEmitter<void> = new EventEmitter<void>();

    //######################### constructor #########################
    constructor(protected _target: ElementRef<HTMLElement>,
                @Inject(POSITION) protected _position: Position)
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

    //######################### protected methods #########################

    /**
     * Applies position according to specified parameters to specified elements
     */
    protected async _applyPosition(): Promise<void>
    {
        const options: Partial<PositionOptions> =
        {
        };

        if(this._placement)
        {
            options.placement = this._placement;
        }

        const result = await this._position.placeElement(this._target.nativeElement,
                                                         this._source,
                                                         options).toPromise();

        applyPositionResult(result);

        if(result.flip)
        {
            this.flip.next();
        }
    }

    //######################### ng language server #########################
    
    /**
     * Custom input type for `placement` input
     */
    public static ngAcceptInputType_placement: PositionPlacement|undefined|null|keyof typeof PositionPlacement;

    //######################### ng language server #########################
    
    /**
     * Custom input type for `positionTo` input
     */
    public static ngAcceptInputType_positionTo: HTMLElement|ElementRef<HTMLElement>;
}
