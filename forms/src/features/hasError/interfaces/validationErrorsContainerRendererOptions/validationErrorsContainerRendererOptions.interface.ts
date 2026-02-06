import {Type} from '@angular/core';

import {ValidationErrorsContainerComponent} from '../validationErrorsContainerComponent/validationErrorsContainerComponent.interface';
import {ValidationErrorsContainerOptions} from '../validationErrorsContainerOptions/validationErrorsContainerOptions.interface';

/**
 * Options for validation errors container renderer
 */
export interface ValidationErrorsContainerRendererOptions
{
    //######################### properties #########################

    /**
     * Type that is used for rendering validation errors container
     */
    validationErrorsContainerType: Type<ValidationErrorsContainerComponent>;

    /**
     * Options for validation errors container
     */
    validationErrorsContainerOptions: ValidationErrorsContainerOptions;
}
