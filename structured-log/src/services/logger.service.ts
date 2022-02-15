import {Injectable, Inject} from '@angular/core';
import {Logger as LoggerInterface} from '@anglr/common';
import {configure, Sink, Logger} from 'structured-log';

import {LOGGER_SINKS} from '../types/tokens';

/**
 * Service used for logging using structured-log
 */
@Injectable()
export class LoggerService implements LoggerInterface
{
    //######################### private fields #########################

    /**
     * Currently used instance of logger
     */
    private _logger: Logger;

    //######################### constructor #########################
    constructor(@Inject(LOGGER_SINKS) sinks: Sink[])
    {
        let configuration = configure();

        sinks.forEach(sink =>
        {
            configuration.writeTo(sink);
        });

        this._logger = configuration.create();
    }

    //######################### public methods #########################

    /**
     * Logs an event with the LogEventLevel.fatal severity.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    fatal(messageTemplate: string, ...properties: any[]);

    /**
     * Logs an event with the LogEventLevel.fatal severity.
     * @param error - Error for the log event.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    fatal(error: Error, messageTemplate: string, ...properties: any[]);

    fatal(errorOrMessageTemplate: any, ...properties: any[]) 
    {
        this._logger.fatal(errorOrMessageTemplate, properties);
    }
    
    /**
     * Logs an event with the LogEventLevel.error severity.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    error(messageTemplate: string, ...properties: any[]);

    /**
     * Logs an event with the LogEventLevel.error severity.
     * @param error - Error for the log event.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    error(error: Error, messageTemplate: string, ...properties: any[]);

    error(errorOrMessageTemplate: any, ...properties: any[]) 
    {
        this._logger.error(errorOrMessageTemplate, properties);
    }
    
    /**
     * Logs an event with the LogEventLevel.warning severity.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    warn(messageTemplate: string, ...properties: any[]);

    /**
     * Logs an event with the LogEventLevel.warning severity.
     * @param error - Error for the log event.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    warn(error: Error, messageTemplate: string, ...properties: any[]);

    warn(errorOrMessageTemplate: any, ...properties: any[]) 
    {
        this._logger.warn(errorOrMessageTemplate, properties);
    }
    
    /**
     * Logs an event with the LogEventLevel.information severity.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    info(messageTemplate: string, ...properties: any[]);

    /**
     * Logs an event with the LogEventLevel.information severity.
     * @param error - Error for the log event.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    info(error: Error, messageTemplate: string, ...properties: any[]);

    info(errorOrMessageTemplate: any, ...properties: any[]) 
    {
        this._logger.info(errorOrMessageTemplate, properties);
    }
    
    /**
     * Logs an event with the LogEventLevel.debug severity.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    debug(messageTemplate: string, ...properties: any[]);

    /**
     * Logs an event with the LogEventLevel.debug severity.
     * @param error - Error for the log event.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    debug(error: Error, messageTemplate: string, ...properties: any[]);

    debug(errorOrMessageTemplate: any, ...properties: any[]) 
    {
        this._logger.debug(errorOrMessageTemplate, properties);
    }
    
    /**
     * Logs an event with the LogEventLevel.verbose severity.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    verbose(messageTemplate: string, ...properties: any[]);

    /**
     * Logs an event with the LogEventLevel.verbose severity.
     * @param error - Error for the log event.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    verbose(error: Error, messageTemplate: string, ...properties: any[]);

    verbose(errorOrMessageTemplate: any, ...properties: any[]) 
    {
        this._logger.verbose(errorOrMessageTemplate, properties);
    }
}