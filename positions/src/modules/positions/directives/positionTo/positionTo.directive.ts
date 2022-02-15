import {Directive, Input, ElementRef, OnChanges, SimpleChanges, Inject, Output, EventEmitter} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {nameof, isPresent} from '@jscrpt/common';

import {positionsWithFlip} from '../../../../misc/utils';

/**
 * Sets position of attached element relative to provided element
 */
@Directive(
{
    selector: "[positionTo]"
})
export class PositionToDirective implements OnChanges
{
    //######################### public properties - inputs #########################

    /**
     * Html element which is used as target for positioning against it
     */
    @Input('positionTo')
    public target: HTMLElement;

    /**
     * Relative coordinates of element
     */
    @Input()
    public elementCoordinates: Positions.PositionsCoordinates = 'top left';

    /**
     * Relative coordinates of target element
     */
    @Input()
    public targetCoordinates: Positions.PositionsCoordinates = 'bottom left';

    //######################### public properties - outputs #########################

    /**
     * Occurs when flip occurs during positioning
     */
    @Output()
    public flip: EventEmitter<void> = new EventEmitter<void>();

    //######################### constructor #########################
    constructor(private _element: ElementRef<HTMLElement>,
                @Inject(DOCUMENT) private _document: HTMLDocument)
    {
    }

    //######################### public methods - implementation of OnChanges #########################
    
    /**
     * Called when input value changes
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        if(nameof<PositionToDirective>('target') in changes && isPresent(this.target))
        {
            positionsWithFlip(this._element.nativeElement, this.elementCoordinates, this.target, this.targetCoordinates, this._document, () => this.flip.emit());
        }
    }
}