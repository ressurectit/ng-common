/**
 * Definition of logs available for `ConsoleComponent`
 */
export interface ConsoleComponentLog
{
    /**
     * Text of log to be displayed
     */
    text: string;

    /**
     * Log level of log
     */
    logLevel: string;

    /**
     * Indication whether detail of line is expanded or not
     */
    expanded?: boolean;
}
