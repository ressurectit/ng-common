import {Component, ChangeDetectionStrategy, ChangeDetectorRef, HostBinding} from '@angular/core';
import {NgClass} from '@angular/common';
import {slideInOutTrigger, animateChildrenTrigger} from '@anglr/animations';

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
    standalone: true,
    imports:
    [
        NgClass,
    ],
    animations: 
    [
        slideInOutTrigger,
        animateChildrenTrigger
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

    //######################### public properties - host #########################

    /**
     * Enables leave animations for internal stuff
     */
    @HostBinding('@animateChildren')
    public animate: boolean = true;

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