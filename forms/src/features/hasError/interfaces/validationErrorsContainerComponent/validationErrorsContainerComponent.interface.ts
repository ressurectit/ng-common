import {InputSignal} from '@angular/core';

import {ValidationErrorData} from '../validationErrorData/validationErrorData.interface';
import {ValidationErrorsContainerOptions} from '../validationErrorsContainerOptions/validationErrorsContainerOptions.interface';

/**
 * Definition of validation errors container
 */
export interface ValidationErrorsContainerComponent
{
    //######################### properties #########################

    /**
     * Array of errors that should be displayed in container
     */
    errors: InputSignal<ValidationErrorData[]>;

    /**
     * Options for validation errors container
     */
    options: InputSignal<ValidationErrorsContainerOptions>;
}
