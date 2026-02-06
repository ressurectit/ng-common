import {ValidationErrorData} from '../validationErrorData/validationErrorData.interface';

/**
 * Context for validation error template
 */
export interface ValidationErrorsTemplateContext
{
    /**
     * Data used for displaying validation error
     */
    $implicit: ValidationErrorData;
}
