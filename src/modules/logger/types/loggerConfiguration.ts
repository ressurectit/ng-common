import {isFunction, isPresent} from '@jscrpt/common';

import {LoggerConfiguration, LoggerEnricherType, LoggerFilter} from '../interfaces';
import {MinimumLevelConfig, WriteToConfig} from '../misc';
import {LoggerOptions} from './loggerOptions';
import {isLoggerSinkType} from '../decorators';
import {SubLoggerSink} from '../services';

/**
 * Implementation of logger configuration
 */
export class LoggerConfigurationImpl implements LoggerConfiguration
{
    //######################### protected fields #########################

    /**
     * Configuration for minimum log level
     */
    protected config: MinimumLevelConfig|undefined|null;

    /**
     * Logger enricher types
     */
    protected loggerEnricherTypes: LoggerEnricherType[] = [];

    /**
     * Array of logger sinks configs
     */
    protected sinks: WriteToConfig[] = [];

    /**
     * Options that are currently configured
     */
    protected options: LoggerOptions;

    //######################### constructor #########################
    constructor(options: LoggerOptions = new LoggerOptions())
    {
        this.options = options;
    }

    //######################### public methods - implementation of LoggerConfiguration #########################

    /**
     * @inheritdoc
     */
    public minimumLevel(config: MinimumLevelConfig): LoggerConfiguration
    {
        this.config = config;

        return this;
    }

    /**
     * @inheritdoc
     */
    public messageTemplate(template: string): LoggerConfiguration
    {
        this.options.messageTemplate = template;

        return this;
    }

    /**
     * @inheritdoc
     */
    public messageLengthLimit(limit: number|null|undefined): LoggerConfiguration
    {
        this.options.messageLengthLimit = limit;

        return this;
    }

    /**
     * @inheritdoc
     */
    public enrichWith(loggerEnricherType: LoggerEnricherType): LoggerConfiguration
    {
        this.loggerEnricherTypes.push(loggerEnricherType);

        return this;
    }

    /**
     * @inheritdoc
     */
    public filter(filter: LoggerFilter|null|undefined): LoggerConfiguration
    {
        this.options.filter = filter;

        return this;
    }

    /**
     * @inheritdoc
     */
    public writeTo(config: WriteToConfig): LoggerConfiguration
    {
        this.sinks.push(config);

        return this;
    }

    //######################### public methods #########################

    /**
     * Builds logger options from configuration
     */
    public buildOptions(): LoggerOptions
    {
        if(isPresent(this.config))
        {
            const config = this.config;

            if(isFunction(config))
            {
                const minLevelCfg = config();

                if(isFunction(minLevelCfg))
                {
                    this.options.minimumLogLevel = minLevelCfg;
                }
                else
                {
                    this.options.minimumLogLevel = () => minLevelCfg;
                }
            }
            else
            {
                this.options.minimumLogLevel = () => config;
            }
        }

        this.options.enrichers.push(...this.loggerEnricherTypes.map(type => new type()));

        this.options.loggerSinks.push(...this.sinks.map(config =>
        {
            if(isLoggerSinkType(config))
            {
                return new config();
            }
            else
            {
                const cfg = new LoggerConfigurationImpl(
                {
                    enrichers: [],
                    loggerSinks: [],
                    filter: undefined,
                    messageLengthLimit: undefined,
                    messageTemplate: undefined,
                    minimumLogLevel: undefined,
                });

                config(cfg);

                return new SubLoggerSink(cfg.buildOptions());
            }
        }));

        return this.options;
    }
}