import {Observable} from 'rxjs';

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

/**
 * Definition of sink data that will be written to `ConsoleComponent`
 */
export interface ConsoleComponentSinkData
{
    /**
     * Occurs when logs change
     */
    readonly logsChange: Observable<void>;

    /**
     * Gets current logs
     */
    readonly logs: ConsoleComponentLog[];

    /**
     * Clears all current logs
     */
    clear(): void;
}
