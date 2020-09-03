/**
 * Object containing information about validation errors result
 */
export interface ValidationErrorsResult
{
    /**
     * Array of error names that are present
     */
    errors: string[];

    /**
     * Array of error messages that should be displayed
     */
    errorMessages: string[];
}