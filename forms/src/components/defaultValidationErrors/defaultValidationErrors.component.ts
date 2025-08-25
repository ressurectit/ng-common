import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {NgClass} from '@angular/common';

import {ValidationErrorsResult} from '../../services/errorMessagesExtractor/errorMessagesExtractor.interface';
import {ValidationErrorsComponent, ValidationErrorsOptions} from '../../services/validationErrorRenderer/validationErrorRenderer.interface';

/**
 * Default validation errors component, displaying validation errors
 */
@Component(
{
    selector: 'default-validation-errors',
    templateUrl: 'defaultValidationErrors.component.html',
    styleUrl: 'defaultValidationErrors.component.css',
    imports:
    [
        NgClass,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultValidationErrorsComponent implements ValidationErrorsComponent
{
    //######################### public properties - template bindings #########################

    /**
     * Errors to be shown
     * @internal
     */
    public errors: ValidationErrorsResult;

    /**
     * Options used for displaying validation errors
     * @internal
     */
    public options: ValidationErrorsOptions;

    //######################### constructor #########################
    constructor(protected _changeDetector: ChangeDetectorRef)
    {
    }

    //######################### public methods - implementation of ValidationErrorsComponent #########################

    /**
     * @inheritdoc
     */
    public show(errors: ValidationErrorsResult, options: ValidationErrorsOptions): void
    {
        this.errors = errors;
        this.options = options;

        this._changeDetector.detectChanges();
    }
}
