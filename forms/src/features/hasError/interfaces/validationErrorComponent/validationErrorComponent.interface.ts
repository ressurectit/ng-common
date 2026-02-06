import {InputSignal} from '@angular/core';

import {ValidationErrorData} from '../validationErrorData/validationErrorData.interface';

/**
 * Definition of validation error component
 */
export interface ValidationErrorComponent
{
    //######################### properties #########################

    /**
     * Instance of validation error data to be displayed
     */
    error: InputSignal<ValidationErrorData>;
}
