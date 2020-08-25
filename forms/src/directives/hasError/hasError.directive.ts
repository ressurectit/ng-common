import {Directive, ElementRef, Optional, SkipSelf, OnInit, OnDestroy, Inject, Input} from "@angular/core";
import {DOCUMENT} from "@angular/common";
import {FormControlDirective, FormControlName, FormControl, NgModel} from "@angular/forms";
import {extend, generateId, StringDictionary} from "@jscrpt/common";
import {StringLocalization, STRING_LOCALIZATION} from '@anglr/common';
import {Subscription} from "rxjs";

import {GroupHasErrorDirective} from "../groupHasError/groupHasError.directive";
import {SubmittedService} from "../../services/submitted/submitted.service";
import {HAS_ERROR_OPTIONS, HAS_ERROR_DEFAULT_MESSAGES} from "../../misc/types";

//TODO - custom component/template for displaying error messages

/**
 * Default error messages displayed
 */
const defaultErrorMessages: StringDictionary =
{
    required: 'Field is required.',
    number: 'Value must be number.',
    pattern: 'Value is not valid.',
    minValue: 'Value is too small.',
    maxValue: 'Value is too big.',
    minlength: 'Value is short.',
    maxlength: 'Value is too long.'
};

/**
 * Default options for HasErrorDirective
 */
const defaultOptions: HasErrorOptions =
{
    prefix: 'ng-',
    suffix: '-error',
    errorDivClass: 'validation-error-div'
};

/**
 * Options for HasErrorDirective
 */
export interface HasErrorOptions
{
    /**
     * Prefix of css classes applied to element
     */
    prefix?: string;

    /**
     * Suffix of css classes applied to element
     */
    suffix?: string;

    /**
     * Css class attached to error div
     */
    errorDivClass?: string;
}

/**
 * Directive that is attached to control element and handles css classes that are added to this element
 */
@Directive(
{
    selector: '[hasError]'
})
export class HasErrorDirective implements OnInit, OnDestroy
{
    //######################### private fields #########################

    /**
     * Subscription for changes of status of control
     */
    private _statusChangesSubscription: Subscription;

    /**
     * Subscription for changes of submitted
     */
    private _submittedChangeSubscription: Subscription;

    /**
     * Subscription for changes of language
     */
    private _textsChangedSubscription: Subscription;

    /**
     * Array storing last known errors css classes
     */
    private _errorsClasses: string[] = [];

    /**
     * Array storing last known errors
     */
    private _errors: string[] = [];

    /**
     * Object storing error messages
     */
    private _errorMessages: StringDictionary;

    /**
     * Options for directive
     */
    private _options: HasErrorOptions = null;

    /**
     * Unique generated id of control
     */
    private _id: string = generateId(10);

    /**
     * Html error div
     */
    private _errorDiv: HTMLDivElement;

    /**
     * Html attribute storing error messages
     */
    private _errorMessageAttr: Attr;

    /**
     * Last value of control pristine attribute
     */
    private _previousDirty: boolean = false;

    /**
     * Mutation observer used for observing changes on class of element
     */
    private _observer: MutationObserver;

    //######################### private properties #########################

    /**
     * Gets control which was assigned to this element
     */
    private get control(): FormControl
    {
        return this._formControl?.control || this._formControlName?.control || this._ngModel?.control;
    }

    //######################### public properties - inputs #########################

    /**
     * Object storing error messages
     */
    @Input()
    public get errorMessages(): StringDictionary
    {
        return this._errorMessages;
    }
    public set errorMessages(errorMessages: StringDictionary)
    {
        this._errorMessages = extend(true, {}, defaultErrorMessages, this._globalErrorMessages, errorMessages);
    }

    //######################### constructor #########################
    constructor(private _element: ElementRef<HTMLElement>,
                @Optional() @SkipSelf() private _groupHasError: GroupHasErrorDirective,
                @Optional() private _formControl: FormControlDirective,
                @Optional() private _formControlName: FormControlName,
                @Optional() private _ngModel: NgModel,
                @Optional() private _submittedSvc: SubmittedService,
                @Inject(DOCUMENT) private _document: HTMLDocument,
                @Inject(STRING_LOCALIZATION) protected _stringLocalization: StringLocalization,
                @Inject(HAS_ERROR_OPTIONS) @Optional() options?: HasErrorOptions,
                @Inject(HAS_ERROR_DEFAULT_MESSAGES) @Optional() private _globalErrorMessages?: StringDictionary)
    {
        this._options = extend(true, {}, defaultOptions, options);
        this.errorMessages = this._globalErrorMessages;
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit()
    {
        this._registerMutationObserver();

        this._errorDiv = this._document.createElement('div');
        this._errorDiv.classList.add(this._options.errorDivClass);

        this._errorMessageAttr = document.createAttribute('data-error-message');

        this._errorDiv.attributes.setNamedItem(this._errorMessageAttr);
        this._element.nativeElement.after(this._errorDiv);

        this._textsChangedSubscription = this._stringLocalization.textsChange.subscribe(() => this._updateStatus());

        if(this.control)
        {
            this._updateStatus();

            this.control.statusChanges.subscribe(() =>
            {
                this._updateStatus();
            });
        }

        if(this._submittedSvc)
        {
            this._submittedChangeSubscription = this._submittedSvc.submittedChange.subscribe(() =>
            {
                this._isSubmittedOrDirty(() => this._toggleErrors());
                this._toggleGroupHasError();
            });
        }
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if(this._statusChangesSubscription)
        {
            this._statusChangesSubscription.unsubscribe();
            this._statusChangesSubscription = null;
        }

        if(this._submittedChangeSubscription)
        {
            this._submittedChangeSubscription.unsubscribe();
            this._submittedChangeSubscription = null;
        }

        if(this._textsChangedSubscription)
        {
            this._textsChangedSubscription.unsubscribe();
            this._textsChangedSubscription = null;
        }

        if(this._groupHasError)
        {
            this._groupHasError.unregisterControl(this._id);
        }

        if(this._errorDiv)
        {
            this._errorDiv.remove();
        }

        if(this._observer)
        {
            this._observer.disconnect();
        }
    }

    //######################### private methods #########################

    /**
     * Updates status of control and css classes
     */
    private _updateStatus()
    {
        this._previousDirty = this.control.dirty;
        this._toggleErrors(false);
        this._errors = this.control.errors ? Object.keys(this.control.errors) : [];
        this._errorsClasses = this._errors.map(error => `${this._options.prefix}${error.toLowerCase()}${this._options.suffix}`);
        this._isSubmittedOrDirty(() => this._toggleErrors());

        this._toggleGroupHasError();
    }

    /**
     * Toggles css classes for errors that are currently set
     */
    private _toggleErrors(add: boolean = true)
    {
        (add ? this._element.nativeElement.classList.add : this._element.nativeElement.classList.remove).apply(this._element.nativeElement.classList, this._errorsClasses);
        (add ? this._errorDiv.classList.add : this._errorDiv.classList.remove).apply(this._errorDiv.classList, this._errorsClasses);

        this._errorMessageAttr.value = (add ? this._errors : [])
            .map(error =>
            {
                if(!this.errorMessages[error])
                {
                    return null;
                }

                return this._stringLocalization.get(this.errorMessages[error], this.control.errors[error]);
            })
            .filter(itm => !!itm)
            .join(' ');
    }

    /**
     * Toggles registration of control in parent group
     */
    private _toggleGroupHasError()
    {
        if(this._groupHasError)
        {
            this._isSubmittedOrDirty(() => this._groupHasError.registerControl(this._id),
                                     () => this._groupHasError.unregisterControl(this._id),
                                     !!this._errorsClasses.length)
        }
    }

    /**
     * Calls action when form is submitted or control is dirty
     * @param action - Action to be called when form is submitted or control dirty
     * @param falseAction - Action to be called when form is not submitted and control is not dirty
     * @param additionalCondition - Additional condition to be evaluated
     */
    private _isSubmittedOrDirty(action: () => void, falseAction: () => void = () => {}, additionalCondition: boolean = true)
    {
        //submitted form or dirty control
        if(((this._submittedSvc && this._submittedSvc.submitted) ||
            (this.control && this.control.dirty)) &&
            additionalCondition)
        {
            action();
        }
        else
        {
            falseAction();
        }
    }

    /**
     * Registers mutation observer which watch for changes of class list
     */
    private _registerMutationObserver()
    {
        this._observer = new MutationObserver(() =>
        {
            if(this.control.dirty != this._previousDirty)
            {
                this._updateStatus();
            }
        });

        this._observer.observe(this._element.nativeElement, 
        {
            attributeFilter: ['class'],
            attributes: true
        });
    }
}