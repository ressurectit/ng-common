import {Component, ChangeDetectionStrategy, ViewContainerRef, ComponentRef, EmbeddedViewRef} from '@angular/core';

import {ValidationErrorsResult} from '../../services/errorMessagesExtractor/errorMessagesExtractor.interface';
import {ValidationErrorsComponent, LegacyValidationErrorsContainerComponent, LegacyValidationErrorsContainerOptions, LegacyValidationErrorsTemplateContext} from '../../services/validationErrorRenderer/validationErrorRenderer.interface';

/**
 * Component that serves as container for validation errors, either component or templates
 */
@Component(
{
    selector: 'default-validation-errors-container',
    template: '',
    styleUrl: 'defaultValidationErrorsContainer.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultValidationErrorsContainerComponent implements LegacyValidationErrorsContainerComponent
{
    //######################### protected fields #########################

    /**
     * Errors to be shown
     * @internal
     */
    protected _errors: ValidationErrorsResult;
    
    /**
     * Options used for displaying validation errors
     * @internal
     */
    protected _options: LegacyValidationErrorsContainerOptions;

    /**
     * Instance of component reference for rendered errors
     */
    protected _component: ComponentRef<ValidationErrorsComponent>;

    /**
     * Instance of template reference for rendered errors
     */
    protected _template: EmbeddedViewRef<LegacyValidationErrorsTemplateContext>;

    //######################### constructor #########################
    constructor(protected _viewContainer: ViewContainerRef)
    {
    }

    //######################### public methods - implementation of  #########################

    /**
     * Shows validation errors
     * @param errors - Errors to be shown
     * @param options - Options used for displaying validation errors
     * @param errorClasses - Array of css error classes
     */
    public show(errors: ValidationErrorsResult, options: LegacyValidationErrorsContainerOptions): void
    {
        this._errors = errors;
        this._options = options;

        if(options.template)
        {
            this._renderTemplate();
        }
        else if(options.component)
        {
            this._renderComponent();
        }
        else
        {
            throw new Error('Missing template or component for rendering validation errors!');
        }
    }

    /**
     * Hides validation errors
     */
    public hide(): void
    {
        this._viewContainer.clear();
        this._component = null;
        this._template = null;
    }

    //######################### protected methods #########################

    /**
     * Renders validation errors component
     */
    protected _renderComponent(): void
    {
        if(!this._component)
        {
            this._component = this._viewContainer.createComponent(this._options.component);
        }

        this._component.instance.show(this._errors, this._options);
    }

    /**
     * Renders validation errors template
     */
    protected _renderTemplate(): void
    {
        if(!this._template)
        {
            this._template = this._viewContainer.createEmbeddedView(this._options.template,
            {
                $implicit: this._errors,
                options: this._options
            });
        }
        else
        {
            this._template.context =
            {
                $implicit: this._errors,
                options: this._options
            };

            this._template.detectChanges();
        }
    }
}