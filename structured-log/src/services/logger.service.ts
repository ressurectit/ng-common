import {Injectable, Inject, Provider, ClassProvider} from '@angular/core';
import {LOGGER, Logger as LoggerInterface, PositionType, TypeProvider} from '@anglr/common';
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
        const configuration = configure();

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
    fatal(messageTemplate: string, ...properties: any[]): void;

    /**
     * Logs an event with the LogEventLevel.fatal severity.
     * @param error - Error for the log event.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    fatal(error: Error, messageTemplate: string, ...properties: any[]): void;

    fatal(errorOrMessageTemplate: any, ...properties: any[]): void
    {
        this._logger.fatal(errorOrMessageTemplate, properties);
    }

    /**
     * Logs an event with the LogEventLevel.error severity.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    error(messageTemplate: string, ...properties: any[]): void;

    /**
     * Logs an event with the LogEventLevel.error severity.
     * @param error - Error for the log event.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    error(error: Error, messageTemplate: string, ...properties: any[]): void;

    error(errorOrMessageTemplate: any, ...properties: any[]): void
    {
        this._logger.error(errorOrMessageTemplate, properties);
    }

    /**
     * Logs an event with the LogEventLevel.warning severity.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    warn(messageTemplate: string, ...properties: any[]): void;

    /**
     * Logs an event with the LogEventLevel.warning severity.
     * @param error - Error for the log event.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    warn(error: Error, messageTemplate: string, ...properties: any[]): void;

    warn(errorOrMessageTemplate: any, ...properties: any[]): void
    {
        this._logger.warn(errorOrMessageTemplate, properties);
    }

    /**
     * Logs an event with the LogEventLevel.information severity.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    info(messageTemplate: string, ...properties: any[]): void;

    /**
     * Logs an event with the LogEventLevel.information severity.
     * @param error - Error for the log event.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    info(error: Error, messageTemplate: string, ...properties: any[]): void;

    info(errorOrMessageTemplate: any, ...properties: any[]): void
    {
        this._logger.info(errorOrMessageTemplate, properties);
    }

    /**
     * Logs an event with the LogEventLevel.debug severity.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    debug(messageTemplate: string, ...properties: any[]): void;

    /**
     * Logs an event with the LogEventLevel.debug severity.
     * @param error - Error for the log event.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    debug(error: Error, messageTemplate: string, ...properties: any[]): void;

    debug(errorOrMessageTemplate: any, ...properties: any[]): void
    {
        this._logger.debug(errorOrMessageTemplate, properties);
    }

    /**
     * Logs an event with the LogEventLevel.verbose severity.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    verbose(messageTemplate: string, ...properties: any[]): void;

    /**
     * Logs an event with the LogEventLevel.verbose severity.
     * @param error - Error for the log event.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    verbose(error: Error, messageTemplate: string, ...properties: any[]): void;

    verbose(errorOrMessageTemplate: any, ...properties: any[]): void
    {
        this._logger.verbose(errorOrMessageTemplate, properties);
    }
}

/**
 * Provider for logger that is using structured log implementation
 */
const STRUCTURED_LOG_LOGGER: Provider =
<ClassProvider>
{
    provide: LOGGER,
    useClass: LoggerService
};

/**
 * Type that contains provider for structured log logger when used with `provideLogger`
 */
@TypeProvider(STRUCTURED_LOG_LOGGER)
class StructuredLogLoggerType
{
}

/**
 * Sets logger to use structured log logger when used with `provideLogger`
 */
export const StructuredLogLogger: PositionType = StructuredLogLoggerType;