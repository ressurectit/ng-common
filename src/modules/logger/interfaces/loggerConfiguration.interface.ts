import {MinimumLevelConfig, WriteToConfig} from '../misc';
import {LoggerEnricherType} from './loggerEnricher.interface';
import {LoggerFilter} from './loggerFilter.interface';

/**
 * Logger configuration instance, it is used for configuring logger sinks, enrichers, filters and everything
 */
export interface LoggerConfiguration
{
    /**
     * Configure minimum log level for all logger sinks
     * @param config - Configuration for minimum log level
     */
    minimumLevel(config: MinimumLevelConfig): LoggerConfiguration;

    /**
     * Sets message template for logs
     * @param template - Template that will be logged in logs
     */
    messageTemplate(template: string): LoggerConfiguration;

    /**
     * Sets message length limit
     * @param limit - Maximal allowed length of message
     */
    messageLengthLimit(limit: number|null|undefined): LoggerConfiguration;

    /**
     * Registers enricher to be used for logger
     * @param loggerEnricherType - Logger enricher type
     */
    enrichWith(loggerEnricherType: LoggerEnricherType): LoggerConfiguration;

    /**
     * Registers filter that is used for filtering out message logs
     * @param filter - Filter that is applied to message logs
     */
    filter(filter: LoggerFilter|undefined|null): LoggerConfiguration;

    /**
     * Registers logger sink into which will be logs written to, or creates sublogger with custom config
     * @param config - Configuration for logger sink creation
     */
    writeTo(config: WriteToConfig): LoggerConfiguration;
}