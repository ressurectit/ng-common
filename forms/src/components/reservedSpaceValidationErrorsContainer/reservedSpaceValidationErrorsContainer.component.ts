import {Component, ChangeDetectionStrategy, ViewContainerRef, ComponentRef, EmbeddedViewRef, ViewChild} from '@angular/core';

import {ValidationErrorsResult} from '../../services/errorMessagesExtractor/errorMessagesExtractor.interface';
import {ValidationErrorsComponent, LegacyValidationErrorsContainerComponent, LegacyValidationErrorsContainerOptions, LegacyValidationErrorsTemplateContext} from '../../services/validationErrorRenderer/validationErrorRenderer.interface';

//TODO: optimize duplicit code

/**
 * Component that serves as container for validation errors, either component or templates with reserved space for errors
 */
@Component(
{
    selector: 'reserved-space-validation-errors-container',
    templateUrl: 'reservedSpaceValidationErrorsContainer.component.html',
    styleUrl: 'reservedSpaceValidationErrorsContainer.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservedSpaceValidationErrorsContainerComponent implements LegacyValidationErrorsContainerComponent
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

    //######################### public properties - children #########################

    /**
     * View container for rendering validation errors
     */
    @ViewChild('container', {static: true, read: ViewContainerRef})
    public viewContainer: ViewContainerRef;

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
        this.viewContainer.clear();
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
            this._component = this.viewContainer.createComponent(this._options.component);
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
            this._template = this.viewContainer.createEmbeddedView(this._options.template,
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