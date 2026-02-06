/**
 * Data used for displaying validation error
 */
export interface ValidationErrorData
{
    //######################### properties #########################

    /**
     * Type of validation error
     */
    type: string;

    /**
     * Message of validation error (could be also validation error message template, if args are available)
     */
    message: string;

    /**
     * Arguments for parametrization of message
     */
    args: Record<string, unknown>;
}
