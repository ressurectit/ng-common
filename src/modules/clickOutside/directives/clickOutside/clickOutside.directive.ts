import {Directive, OnInit, OnDestroy, Input, EventEmitter, Output, ElementRef, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {isDescendant, isString} from '@jscrpt/common';

/**
 * Directive that handles click outside of element
 */
@Directive(
{
    selector: '[clickOutside]'
})
export class ClickOutsideDirective implements OnInit, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Variable that is used for displaying element that handles click outside
     */
    protected _clickOutsideCondition: boolean;

    //######################### public properties - inputs #########################

    /**
     * Variable that is used for displaying element that handles click outside
     */
    @Input('clickOutside')
    public get clickOutsideCondition(): boolean
    {
        return this._clickOutsideCondition;
    }
    public set clickOutsideCondition(value: boolean)
    {
        if(isString(value) && value === '')
        {
            this._clickOutsideCondition = true;

            return;
        }

        this._clickOutsideCondition = value;
    }

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
    constructor(protected _element: ElementRef<HTMLElement>,
                @Inject(DOCUMENT) protected _document: Document)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this._document.addEventListener('mouseup', this._handleClickOutside);
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this._document.removeEventListener('mouseup', this._handleClickOutside);
    }

    //######################### protected methods #########################

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

    //######################### ng language server #########################
    
    /**
     * Custom input type for `clickOutsideCondition` input
     */
    public static ngAcceptInputType_clickOutsideCondition: boolean|'';
}