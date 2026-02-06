import {ValidationErrorsContainerRendererCtor} from '../validationErrorsContainerRendererCtor/validationErrorsContainerRendererCtor.interface';
import {ValidationErrorsContainerRendererOptions} from '../validationErrorsContainerRendererOptions/validationErrorsContainerRendererOptions.interface';

/**
 * Options for 'HasError' directive
 */
export interface HasErrorOptions
{
    //######################### properties #########################

    /**
     * Options for validation errors container renderer
     */
    validationErrorsContainerRendererOptions: ValidationErrorsContainerRendererOptions;

    /**
     * Type that is used for rendering validation errors container and placing it in html
     */
    validationErrorsContainerRendererType: ValidationErrorsContainerRendererCtor;
}
