import {Observable} from 'rxjs';

/**
 * Definition of sink that will write to `ConsoleComponent`
 */
export interface ConsoleComponentSink
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
 * Definition of log object that is sent to server
 */
export interface RestLog
{
    /**
     * Timestamp when log occured
     */
    timestamp: string;

    /**
     * Level of log
     */
    logLevel: string;

    /**
     * Message to be logged
     */
    message: string;
}

/**
 * Client used for logging logs using REST
 */
export interface LoggerRestClient
{
    /**
     * Logs message on server using REST
     * @param logs - Array of logs to be logged
     */
    log(logs: RestLog[]): Observable<void>;
}