import {Directive, ElementRef, Optional, SkipSelf, OnInit, OnDestroy, Inject, Input, Injector, ViewContainerRef, AfterViewInit, Type, TemplateRef} from '@angular/core';
import {FormControlDirective, FormControlName, FormControl, NgModel} from '@angular/forms';
import {StringLocalization, STRING_LOCALIZATION} from '@anglr/common';
import {generateId, BindThis, StringDictionary} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {ValidationErrorRendererFactory} from '../../services/validationErrorRenderer/validationErrorRenderer.service';
import {ValidationErrorRenderer, ValidationErrorsComponent, ValidationErrorsRendererOptions, ValidationErrorsTemplateContext} from '../../services/validationErrorRenderer/validationErrorRenderer.interface';
import {SubmittedService} from '../../services/submitted/submitted.service';
import {GroupHasErrorDirective} from '../groupHasError/groupHasError.directive';
import {ValidationErrorsContainerView} from '../../misc/validationErrorsContainerView';

//TODO: add support for setting renderer factory options using input
//TODO: add support for events instead of mutation observer

/**
 * Directive that is attached to control element and handles css classes that are added to this element
 */
@Directive(
{
    selector: '[hasError]',
    standalone: true,
})
export class HasErrorDirective implements OnInit, AfterViewInit, OnDestroy
{
    //######################### private fields #########################

    /**
     * Subscriptions that are destroyed with destruction of this directive
     */
    private _subscriptions: Subscription = new Subscription();

    /**
     * Unique generated id of control
     */
    private _id: string = generateId(10);

    /**
     * Last value of control pristine attribute
     */
    private _previousDirty: boolean = false;

    /**
     * Indication whether currently are any errors rendered
     */
    private _hasErrors: boolean = false;

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

    //######################### public properties #########################

    /**
     * Instance of validation error renderer
     */
    public renderer: ValidationErrorRenderer;

    //######################### public propeties - inputs #########################

    /**
     * Customized error messages
     */
    @Input()
    public errorMessages: StringDictionary;

    /**
     * Custom component used for rendering validation errors
     */
    @Input()
    public errorsComponent?: Type<ValidationErrorsComponent>;

    /**
     * Custom template used for rendering validation errors
     */
    @Input()
    public errorsTemplate?: TemplateRef<ValidationErrorsTemplateContext>;

    //######################### constructor #########################
    constructor(private _element: ElementRef<HTMLElement>,
                private _rendererFactory: ValidationErrorRendererFactory,
                private _viewContainer: ViewContainerRef,
                @Optional() @SkipSelf() private _groupHasError: GroupHasErrorDirective,
                @Optional() private _formControl: FormControlDirective,
                @Optional() private _formControlName: FormControlName,
                @Optional() private _ngModel: NgModel,
                @Optional() private _submittedSvc: SubmittedService,
                @Optional() private _containerView: ValidationErrorsContainerView,
                @Inject(STRING_LOCALIZATION) protected _stringLocalization: StringLocalization,
                protected _injector: Injector)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this._containerView ??= new ValidationErrorsContainerView();
        this._containerView.viewContainer ??= this._viewContainer;

        this._registerMutationObserver();

        this._subscriptions.add(this._stringLocalization.textsChange.subscribe(() => this._updateStatus()));
        this._subscriptions.add(this.control.statusChanges.subscribe(() => this._updateStatus()));

        if(this._submittedSvc)
        {
            this._subscriptions.add(this._submittedSvc.submittedChange.subscribe(() => this._isSubmittedOrDirty(() => this._updateStatus())));
        }
    }

    //######################### public methods - implementation of AfterViewInit #########################
    
    /**
     * Called when view was initialized
     */
    public ngAfterViewInit(): void
    {
        this.renderer = this._rendererFactory.create(this.control,
                                                     this._containerView,
                                                     this._injector,
                                                     this._isSubmittedOrDirty);

        this._updateStatus();
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this._subscriptions.unsubscribe();

        this._groupHasError?.unregisterControl(this._id);
        this._observer?.disconnect();
        this.renderer?.destroy();
    }

    //######################### private methods #########################

    /**
     * Updates status of control and css classes
     */
    private _updateStatus(): void
    {
        if(!this.renderer)
        {
            return;
        }

        const opts: ValidationErrorsRendererOptions = {};

        if(this.errorsTemplate)
        {
            opts.template = this.errorsTemplate;
        }
        else if(this.errorsComponent)
        {
            opts.component = this.errorsComponent;
        }

        this._previousDirty = this.control.dirty;
        this._hasErrors = this.renderer.update(opts, this.errorMessages);
        this._toggleGroupHasError();
    }

    /**
     * Toggles registration of control in parent group
     */
    private _toggleGroupHasError(): void
    {
        if(this._groupHasError)
        {
            this._isSubmittedOrDirty(() => this._groupHasError.registerControl(this._id),
                                     () => this._groupHasError.unregisterControl(this._id),
                                     this._hasErrors);
        }
    }

    /**
     * Calls action when form is submitted or control is dirty
     * @param action - Action to be called when form is submitted or control dirty
     * @param falseAction - Action to be called when form is not submitted and control is not dirty
     * @param additionalCondition - Additional condition to be evaluated
     */
    @BindThis
    private _isSubmittedOrDirty(action: () => void, falseAction: () => void = () => {}, additionalCondition: boolean = true): void
    {
        //submitted form or dirty control
        if((this._submittedSvc?.submitted ||
            this.control?.dirty) &&
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
    private _registerMutationObserver(): void
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