import {Component, ChangeDetectionStrategy, Input, EventEmitter, Output, ContentChild, TemplateRef, Inject, OnDestroy, ChangeDetectorRef, Optional, ElementRef} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {extend} from '@jscrpt/common';

import {MultiButtonCssClasses} from './multiButton.interface';
import {MULTI_BUTTON_CSS_CLASSES} from '../../misc/tokens';

const defaultCssClasses: MultiButtonCssClasses =
{
    mainButtonDiv: 'flex-row',
    mainButtonContentDiv: 'multi-button-content',
    mainButtonSeparatorDiv: 'fa multi-option-separator',
    mainButtonClickAreaDiv: 'multi-option-click',
    mainButtonMultiOptionDiv: 'multi-option fa fa-angle-down',
    subButtonsDiv: 'sub-buttons'
};

/**
 * Component used for displaying multibutton
 */
@Component(
{
    selector: 'multi-button',
    templateUrl: 'multiButton.component.html',
    styleUrls: ['multiButton.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiButtonComponent implements OnDestroy
{
    //######################### protected fields #########################

    /**
     * Used css classes within component
     */
    protected _usedCssClasses: MultiButtonCssClasses;

    //######################### public properties - template bindings #########################

    /**
     * Indication whether are sub buttons visible
     * @internal
     */
    public subButtonsVisible: boolean = false;

    /**
     * Sub buttons div top offset
     * @internal
     */
    public subButtonsOffset: number = 0;

    //######################### public properties - inputs #########################

    /**
     * Css class applied to main displayed element
     */
    @Input()
    public cssClass: string = '';

    /**
     * Css classes used within component, allows to change specific class
     */
    @Input()
    public get cssClasses(): MultiButtonCssClasses
    {
        return this._usedCssClasses;
    }
    public set cssClasses(classes: MultiButtonCssClasses)
    {
        this._usedCssClasses = extend({}, this._usedCssClasses, classes);
    }

    //######################### public properties - outputs #########################

    /**
     * Occurs when user clicks on button
     */
    @Output()
    public click: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    //######################### public properties - children #########################

    /**
     * Template that is used for rendering sub buttons content
     */
    @ContentChild(TemplateRef)
    public subButtonsContent: TemplateRef<void>;

    //######################### constructor #########################
    constructor(@Inject(DOCUMENT) protected _document: Document,
                @Inject(MULTI_BUTTON_CSS_CLASSES) @Optional() _cssClasess: MultiButtonCssClasses,
                protected _element: ElementRef<HTMLElement>,
                protected _changeDetector: ChangeDetectorRef)
    {
        this._usedCssClasses = extend({}, defaultCssClasses, _cssClasess);
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this._removeRegistration();
    }

    //######################### public methods - template bindings #########################

    /**
     * Method called when sub buttons should be shown
     */
    public showSubButtons(event: MouseEvent): void
    {
        event.preventDefault();
        event.stopPropagation();

        this.subButtonsVisible = !this.subButtonsVisible;
        this.subButtonsOffset = this._element.nativeElement.clientHeight + 2;

        if(this.subButtonsVisible)
        {
            this._document.addEventListener('click', this._handleClickOutside);
        }
        //unregister handle click outside
        else
        {
            this._removeRegistration();
        }
    }

    //######################### protected methods #########################

    /**
     * Handles click outside of multi button element
     */
    protected _handleClickOutside = () =>
    {
        this.subButtonsVisible = false;
        this._removeRegistration();
        this._changeDetector.detectChanges();
    }

    /**
     * Removes event registration
     */
    protected _removeRegistration(): void
    {
        this._document.removeEventListener('click', this._handleClickOutside);
    }
}