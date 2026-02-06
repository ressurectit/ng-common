import {Component, ChangeDetectionStrategy, InputSignal, input, Signal, computed} from '@angular/core';
import {LocalizePipe} from '@anglr/common';

import {ValidationErrorComponent, ValidationErrorData} from '../../interfaces';

/**
 * Component used for displaying validation error
 */
@Component(
{
    selector: 'validation-error',
    templateUrl: 'validationError.component.html',
    imports:
    [
        LocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationError implements ValidationErrorComponent
{
    //######################### public properties - inputs #########################

    /**
     * @inheritdoc
     */
    public error: InputSignal<ValidationErrorData> = input.required();

    //######################### protected properties - template bindings #########################

    /**
     * Css classes that should be applied to error div
     */
    protected cssClasses: Signal<Record<string, boolean>> = computed(() =>
    {
        return {
            [`error-type-${this.error().type}`]: true,
        };
    });
}
