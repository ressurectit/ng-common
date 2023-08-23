import {Observable} from 'rxjs';

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