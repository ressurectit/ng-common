import {Directive, OnInit, OnDestroy, Input, EventEmitter, Output, ElementRef, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {isDescendant} from '@jscrpt/common';

/**
 * Directive that handles click outside of element
 */
@Directive(
    {
        selector: '[clickOutside]'
    })
export class ClickOutsideDirective implements OnInit, OnDestroy
{
    //######################### public properties - inputs #########################

    /**
     * Variable that is used for displaying element that handles click outside
     */
    @Input('clickOutside')
    public clickOutsideCondition: boolean;

    /**
     * Additional element that is checked for click
     */
    @Input()
    public clickOutsideElement: HTMLElement;

    //######################### public properties - outputs #########################

    /**
     * Used for emitting event when click outside occurs
     */
    @Output('clickOutsideChange')
    public clickOutsideConditionChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    //######################### constructor #########################
    constructor(private _element: ElementRef<HTMLElement>,
                @Inject(DOCUMENT) private _document: Document)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit()
    {
        this._document.addEventListener('mouseup', this._handleClickOutside);
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        this._document.removeEventListener('mouseup', this._handleClickOutside);
    }

    //######################### private methods #########################

    /**
     * Handles click outside of element
     * @param event - Mouse event object
     */
    protected _handleClickOutside = (event: MouseEvent) =>
    {
        if(this._element.nativeElement != event.target &&
           !isDescendant(this._element.nativeElement, event.target as HTMLElement) &&
           (!this.clickOutsideElement || (this.clickOutsideElement != event.target &&
                                          !isDescendant(this.clickOutsideElement, event.target as HTMLElement))))
        {   
            this.clickOutsideCondition = !this.clickOutsideCondition;
            this.clickOutsideConditionChange.emit(this.clickOutsideCondition);
        }
    }
}