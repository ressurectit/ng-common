import {MinLogLevelGetter} from '../misc';
import {LoggerOptions, MessageLog} from '../types';
import {LoggerEnricher} from './loggerEnricher.interface';
import {LoggerFilter} from './loggerFilter.interface';

/**
 * Definition of sink, which is used to writing logs into different places
 */
export interface LoggerSink
{
    /**
     * Array of enrichers specific to logger that allows extending logger properties
     */
    readonly enrichers?: LoggerEnricher[];

    /**
     * Filter specific for sink, both logger and specific filters are used
     */
    readonly filter?: LoggerFilter|null;

    /**
     * Minimum log level specific to sink, if set it overrides minimum log level for
     */
    readonly minimumLogLevel?: MinLogLevelGetter|null;

    /**
     * Logs message into sink
     * @param options - Logger global options
     * @param loggerProperties - Properties for logger level, obtained by enrichment
     * @param messageLog - Message log to be logged
     */
    log(options: LoggerOptions, loggerProperties: Record<string, unknown>, messageLog: MessageLog): void;
}

/**
 * Type that represents logger sink
 */
export interface LoggerSinkType extends Function
{
    new(): LoggerSink;
}