import {Injectable, Inject, Optional, Injector, ComponentRef} from '@angular/core';
import {FormControl} from '@angular/forms';
import {StringDictionary} from '@jscrpt/common';
import {extend} from '@jscrpt/common/extend';

import {ErrorMessagesExtractor} from '../errorMessagesExtractor/errorMessagesExtractor.service';
import {ValidationErrorRenderer, IsSubmittedOrDirtyFunc, ValidationErrorsRendererOptions, ValidationErrorRendererFactoryOptions, ValidationErrorsContainerComponent} from './validationErrorRenderer.interface';
import {ValidationErrorsResult} from '../errorMessagesExtractor/errorMessagesExtractor.interface';
import {VALIDATION_ERROR_RENDERER_FACTORY_OPTIONS} from '../../misc/tokens';
import {ValidationErrorsContainerView} from '../../misc/validationErrorsContainerView';
import {DefaultValidationErrorsComponent, DefaultValidationErrorsContainerComponent} from '../../components';

/**
 * Service used for creating validation errors renderer
 */
@Injectable({providedIn: 'root'})
export class ValidationErrorRendererFactory
{
    //######################### protected fields #########################

    /**
     * Options for validation error renderer factory
     */
    protected _options: ValidationErrorRendererFactoryOptions;

    //######################### constructor #########################
    constructor(protected _errorMessagesExtractor: ErrorMessagesExtractor,
                @Optional() @Inject(VALIDATION_ERROR_RENDERER_FACTORY_OPTIONS) options: ValidationErrorRendererFactoryOptions)
    {
        this._options = extend(true, {}, DEFAULT_OPTIONS, options);
    }

    //######################### public methods #########################

    /**
     * Creates new instance of ValidationErrorRenderer
     * @param control - Control that is being processed for errors
     * @param containerView - Class that stores view container for rendering errors
     * @param injector - Injector for obtaining dependencies
     * @param isSubmittedOrDirty - Function used for testing if control is submitted or dirty
     */
    public create(control: FormControl,
                  containerView: ValidationErrorsContainerView,
                  injector: Injector,
                  isSubmittedOrDirty: IsSubmittedOrDirtyFunc): ValidationErrorRenderer
    {
        return new this._options.rendererType(this._errorMessagesExtractor,
                                              control,
                                              containerView,
                                              injector,
                                              isSubmittedOrDirty,
                                              this._options);
    }
}

/**
 * Default implementation of validation error renderer
 */
export class DefaultValidationErrorRenderer implements ValidationErrorRenderer
{
    //######################### protected fields #########################

    /**
     * Object storing last obtained errors
     */
    protected _lastErrors: ValidationErrorsResult;

    /**
     * Component used as validation errors container
     */
    protected _container: ComponentRef<ValidationErrorsContainerComponent>;

    //######################### constructor #########################
    constructor(protected _errorMessagesExtractor: ErrorMessagesExtractor,
                protected _control: FormControl,
                protected _containerView: ValidationErrorsContainerView,
                protected _injector: Injector,
                protected _isSubmittedOrDirty: IsSubmittedOrDirtyFunc,
                protected _options: ValidationErrorsRendererOptions)
    {
        this._initialize();
    }

    //######################### public methods - implementation of ValiDationErrorRenderer #########################

    /**
     * @inheritdoc
     */
    public destroy(): void
    {
        this._containerView.viewContainer.clear();
        this._container = null;
    }

    /**
     * @inheritdoc
     */
    public update(options: ValidationErrorsRendererOptions, errorMessages?: StringDictionary): boolean
    {
        let result = false;
        this._lastErrors = this._errorMessagesExtractor.getErrors(this._control, errorMessages);

        //has errors
        if(this._lastErrors)
        {
            this._isSubmittedOrDirty(() =>
                                     {
                                         // const errorsClasses = this._lastErrors.errors.map(error => `${this._options.prefix}${error.toLowerCase()}${this._options.suffix}`);
                                         const opts = extend(true, {}, this._options, options);

                                         this._container.instance.show(this._lastErrors, opts);
                                         result = true;
                                     },
                                     () =>
                                     {
                                         this._container.instance.hide();
                                         result = false;
                                     });
        }
        else
        {
            this._container.instance.hide();
            result = false;
        }

        return result;
    }

    /**
     * Initialize renderer
     */
    protected _initialize(): void
    {
        this._container = this._containerView.viewContainer.createComponent(this._options.container, {injector: this._injector});
        this._container.instance.hide();
    }
}

/**
 * Default options for validation error renderer factory
 */
const DEFAULT_OPTIONS: ValidationErrorRendererFactoryOptions =
{
    prefix: 'ng-',
    suffix: '-error',
    wrapperDivClass: 'validation-error-div',
    rendererType: DefaultValidationErrorRenderer,
    component: DefaultValidationErrorsComponent,
    container: DefaultValidationErrorsContainerComponent,
};