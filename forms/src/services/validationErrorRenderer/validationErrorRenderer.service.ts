import {Injectable, Inject, InjectionToken, Optional, Injector, ComponentFactoryResolver, ApplicationRef, EmbeddedViewRef, ComponentRef} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DOCUMENT} from '@angular/common';
import {extend, StringDictionary} from '@jscrpt/common';

import {ErrorMessagesExtractor} from '../errorMessagesExtractor/errorMessagesExtractor.service';
import {ValidationErrorRenderer, IsSubmittedOrDirtyFunc, ValidationErrorsRendererOptions, ValidationErrorRendererFactoryOptions, ValidationErrorsComponent} from './validationErrorRenderer.interface';
import {ValidationErrorsResult} from '../errorMessagesExtractor/errorMessagesExtractor.interface';

/**
 * Injection token used for injecting global options for ValidationErrorRendererFactory
 */
export const VALIDATION_ERROR_RENDERER_FACTORY_OPTIONS: InjectionToken<ValidationErrorRendererFactoryOptions> = new InjectionToken<ValidationErrorRendererFactoryOptions>("VALIDATION_ERROR_RENDERER_FACTORY_OPTIONS");

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
                @Inject(DOCUMENT) protected _document: HTMLDocument,
                @Optional() @Inject(VALIDATION_ERROR_RENDERER_FACTORY_OPTIONS) options: ValidationErrorRendererFactoryOptions)
    {
        this._options = extend(true, {}, DEFAULT_OPTIONS, options);
    }

    //######################### public methods #########################

    /**
     * Creates new instance of ValidationErrorRenderer
     * @param control - Control that is being processed for errors
     * @param controlElement - Html element that represents control that is being processed
     * @param isSubmittedOrDirty - Function used for testing if control is submitted or dirty
     * @param options - Options for validation errors renderer factory
     */
    public create(control: FormControl,
                  controlElement: HTMLElement,
                  injector: Injector,
                  isSubmittedOrDirty: IsSubmittedOrDirtyFunc,
                  options: ValidationErrorRendererFactoryOptions): ValidationErrorRenderer
    {
        let opts: ValidationErrorRendererFactoryOptions = extend(true, {}, this._options, options);

        return new opts.rendererType(this._errorMessagesExtractor,
                                     control,
                                     controlElement,
                                     this._document,
                                     injector,
                                     isSubmittedOrDirty,
                                     opts);
    }
}

/**
 * Default implementation of validation error renderer
 */
export class DefaultValidationErrorRenderer implements ValidationErrorRenderer
{
    //######################### protected fields #########################

    /**
     * Html element attribute storing error messages
     */
    protected _errorMessageAttr: Attr;

    /**
     * Object storing last obtained errors
     */
    protected _lastErrors: ValidationErrorsResult;

    /**
     * Component used for displaying errors
     */
    protected _component: ComponentRef<ValidationErrorsComponent>;

    //######################### public properties - implementation of ValidationErrorRenderer #########################

    /**
     * Html element that is wrapping errors
     */
    public wrapperElement: HTMLElement;

    //######################### constructor #########################
    constructor(protected _errorMessagesExtractor: ErrorMessagesExtractor,
                protected _control: FormControl,
                protected _controlElement: HTMLElement,
                protected _document: HTMLDocument,
                protected _injector: Injector,
                protected _isSubmittedOrDirty: IsSubmittedOrDirtyFunc,
                protected _options: ValidationErrorsRendererOptions)
    {
        this._initialize();
    }

    //######################### public methods - implementation of ValiDationErrorRenderer #########################

    /**
     * Destroys renderer and everything that was rendered
     */
    public destroy(): void
    {
        if(this._component)
        {
            this._injector.get(ApplicationRef).detachView(this._component.hostView);
            this._component.destroy();
            this._component = null;
        }

        this.wrapperElement?.remove();
        this.wrapperElement = null;
    }

    /**
     * Updates rendered errors for current state and returns true if errors were rendered, otherwise false
     * @param errorMessages - Object storing error messages to be used as override
     * @param onlyShow - Indication that update performs only displaying of existing errors
     */
    public update(errorMessages?: StringDictionary, onlyShow: boolean = false): boolean
    {
        let result = false;

        if(onlyShow)
        {
            this._isSubmittedOrDirty(() =>
                                     {
                                         this._show();
                                         this._toggleErrors();
                                         result = true
                                     },
                                     () =>
                                     {
                                         this._hide();
                                         result = false
                                     },
                                     !!this._lastErrors);

            return result;
        }

        //hides old errors
        this._toggleErrors(false);
        this._lastErrors = this._errorMessagesExtractor.getErrors(this._control, errorMessages);

        if(this._lastErrors)
        {
            this._isSubmittedOrDirty(() =>
                                     {
                                         this._show();
                                         result = true;
                                         this._toggleErrors();
                                     },
                                     () =>
                                     {
                                        this._hide();
                                         result = false;
                                     });
        }
        else
        {
            this._hide();
            result = false;
        }

        return result;
    }

    //######################### protected methods #########################

    /**
     * Toggles css classes for errors that are currently set
     * @param add - Indication whether add or remove errors
     */
    protected _toggleErrors(add: boolean = true)
    {
        if(!this._lastErrors)
        {
            return;
        }

        let errorsClasses = this._lastErrors.errors.map(error => `${this._options.prefix}${error.toLowerCase()}${this._options.suffix}`);

        (add ? this._controlElement.classList.add : this._controlElement.classList.remove).apply(this._controlElement.classList, errorsClasses);
        (add ? this.wrapperElement.classList.add : this.wrapperElement.classList.remove).apply(this.wrapperElement.classList, errorsClasses);

        this._errorMessageAttr.value = (add ? this._lastErrors.errorMessages : [])
            .join(' ');

        this._render(add);
    }

    /**
     * Initialize renderer
     */
    protected _initialize()
    {
        this.wrapperElement = this._document.createElement('div');
        this._hide();
        this.wrapperElement.classList.add(this._options.wrapperDivClass);

        this._errorMessageAttr = this._document.createAttribute('data-error-message');

        this.wrapperElement.attributes.setNamedItem(this._errorMessageAttr);
        this._controlElement.after(this.wrapperElement);
    }

    /**
     * Renders error messages
     * @param add - Indication whether add or remove errors
     */
    protected _render(add: boolean)
    {
        if(this._options.component)
        {
            this._renderComponent(add);
        }
        else if(this._options.template)
        {
            this._renderTemplate(add);
        }
        else
        {
            this._renderDivs(add);
        }
    }

    /**
     * Renders divs with errors
     * @param add - Indication whether add or remove errors
     */
    protected _renderDivs(add: boolean = true)
    {
        if(!add)
        {
            let children = this.wrapperElement.children;
    
            //first clean old messages
            for(let x = children.length - 1; x >= 0; x--)
            {
                children.item(x).remove();
            }

            return;
        }

        if(this._lastErrors?.errorMessages?.length)
        {
            this._lastErrors.errorMessages.forEach(message =>
            {
                let errorDiv = this._document.createElement('div');

                errorDiv.innerText = message;

                this.wrapperElement.append(errorDiv);
            });
        }
    }

    /**
     * Renders component with errors
     * @param add - Indication whether add or remove errors
     */
    protected _renderComponent(add: boolean = true)
    {
        if(add)
        {
            //render component
            if(!this._component)
            {
                // 1. Create a component reference from the component 
                this._component = this._injector.get(ComponentFactoryResolver)
                    .resolveComponentFactory(this._options.component)
                    .create(this._injector);

                // 2. Attach component to the appRef so that it's inside the ng component tree
                this._injector.get(ApplicationRef).attachView(this._component.hostView);

                // 3. Get DOM element from component
                const domElem = (this._component.hostView as EmbeddedViewRef<any>)
                    .rootNodes[0] as HTMLElement;

                // 4. Append DOM element to the body
                this.wrapperElement.append(domElem);
            }

            this._component.instance.show(this._lastErrors);
        }
        else if(this._component)
        {
            this._component.instance.show(null);
        }
    }

    /**
     * Renders template with errors
     * @param add - Indication whether add or remove errors
     */
    protected _renderTemplate(add: boolean = true)
    {

    }

    /**
     * Shows wrapper element
     */
    protected _show()
    {
        this.wrapperElement.style.display = 'block';
    }

    /**
     * Hides wrapper element
     */
    protected _hide()
    {
        this.wrapperElement.style.display = 'none';
    }
}

const DEFAULT_OPTIONS: ValidationErrorRendererFactoryOptions =
{
    prefix: 'ng-',
    suffix: '-error',
    wrapperDivClass: 'validation-error-div',
    rendererType: DefaultValidationErrorRenderer
};