import {Directive, OnInit, OnDestroy, Input, EventEmitter, Output, ElementRef, Inject, NgZone} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {isDescendant, isString} from '@jscrpt/common';

/**
 * Directive that handles click outside of element
 */
@Directive(
{
    selector: '[clickOutside]',
    standalone: true,
})
export class ClickOutsideSADirective implements OnInit, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Variable that is used for displaying element that handles click outside
     */
    protected ɵclickOutsideCondition: boolean = false;

    //######################### public properties - inputs #########################

    /**
     * Variable that is used for displaying element that handles click outside
     */
    @Input('clickOutside')
    public get clickOutsideCondition(): boolean
    {
        return this.ɵclickOutsideCondition;
    }
    public set clickOutsideCondition(value: boolean)
    {
        if(isString(value) && value === '')
        {
            this.ɵclickOutsideCondition = true;

            return;
        }

        this.ɵclickOutsideCondition = value;
    }

    /**
     * Additional element that is checked for click
     */
    @Input()
    public clickOutsideElement: HTMLElement|undefined|null;

    //######################### public properties - outputs #########################

    /**
     * Used for emitting event when click outside occurs
     */
    @Output('clickOutsideChange')
    public clickOutsideConditionChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    //######################### constructor #########################
    constructor(protected element: ElementRef<HTMLElement>,
                @Inject(DOCUMENT) protected document: Document,
                protected ngZone: NgZone,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this.ngZone.runOutsideAngular(() =>
        {
            this.document.addEventListener('mouseup', this.handleClickOutside);
        });
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.ngZone.runOutsideAngular(() =>
        {
            this.document.removeEventListener('mouseup', this.handleClickOutside);
        });
    }

    //######################### protected methods #########################

    /**
     * Handles click outside of element
     * @param event - Mouse event object
     */
    protected handleClickOutside = (event: MouseEvent) =>
    {
        if(this.element.nativeElement != event.target &&
           !isDescendant(this.element.nativeElement, event.target as HTMLElement) &&
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