import {Directive, ElementRef, Inject, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {StringLocalization, STRING_LOCALIZATION} from '@anglr/common';
import {Dictionary, isBlank, nameof, StringDictionary} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {VALIDATION_ERROR_MESSAGES} from '../../../../misc/tokens';

/**
 * Directive used for displaying form error message
 */
@Directive(
{
    selector: '[errorMessage]',
    exportAs: 'errorMessage',
})
export class ErrorMessageDirective implements OnChanges, OnDestroy
{
    //######################### protected properties #########################

    /**
     * Subscriptions created during initialization
     */
    protected _initSubscriptions: Subscription = new Subscription();

    //######################### public properties - inputs #########################

    /**
     * Name/code of error message to be displayed
     */
    @Input('errorMessage')
    public errorName: string;

    /**
     * Object storing all errors
     */
    @Input()
    public errors: Dictionary;

    //######################### constructor #########################
    constructor(protected _element: ElementRef<HTMLElement>,
                @Inject(STRING_LOCALIZATION) protected _localization: StringLocalization,
                @Inject(VALIDATION_ERROR_MESSAGES) protected _errorMessages: StringDictionary,)
    {
        this._initSubscriptions.add(this._localization.textsChange.subscribe(() => this._showMessage()));
    }

    //######################### public methods - implementation of OnChanges #########################
    
    /**
     * Called when input value changes
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        if(nameof<ErrorMessageDirective>('errorName') in changes)
        {
            this._showMessage();
        }
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this._initSubscriptions?.unsubscribe();
        this._initSubscriptions = null;
    }

    //######################### protected methods #########################

    /**
     * Shows message inside of element
     */
    protected _showMessage(): void
    {
        if(isBlank(this.errorName))
        {
            this._element.nativeElement.innerHTML = '';

            return;
        }

        const errorMessage = this._errorMessages[this.errorName];
        const message = this._localization.get(errorMessage, this.errors);

        this._element.nativeElement.innerHTML = message;
    }
}