import {Injectable, forwardRef} from '@angular/core';
import {isBlank} from '@jscrpt/common';

import {LogLevel, LoggerOptions, MessageLog} from '../../types';
import {loggerEnabled, useEnrichers} from '../../misc';
import {Logger} from './logger.interface';
import {TypeProvider} from '../../../../types/providerDecoratedType';
import {LOGGER} from '../../../../types/tokens';

/**
 * Default implementation of `Logger`
 */
@Injectable()
@TypeProvider({provide: LOGGER, useClass: forwardRef(() => DefaultLogger)})
export class DefaultLogger implements Logger
{
    //######################### constructor #########################
    constructor(protected options: LoggerOptions,)
    {
    }

    //######################### public methods - implementation of Logger #########################

    /**
     * @inheritdoc
     */
    public fatal(messageTemplate: string, properties?: Record<string, unknown>): void
    {
        this.log(messageTemplate, LogLevel.Fatal, properties);
    }

    /**
     * @inheritdoc
     */
    public error(messageTemplate: string, properties?: Record<string, unknown>): void
    {
        this.log(messageTemplate, LogLevel.Error, properties);
    }

    /**
     * @inheritdoc
     */
    public warn(messageTemplate: string, properties?: Record<string, unknown>): void
    {
        this.log(messageTemplate, LogLevel.Warning, properties);
    }

    /**
     * @inheritdoc
     */
    public info(messageTemplate: string, properties?: Record<string, unknown>): void
    {
        this.log(messageTemplate, LogLevel.Information, properties);
    }

    /**
     * @inheritdoc
     */
    public debug(messageTemplate: string, properties?: Record<string, unknown>): void
    {
        this.log(messageTemplate, LogLevel.Debug, properties);
    }

    /**
     * @inheritdoc
     */
    public verbose(messageTemplate: string, properties?: Record<string, unknown>): void
    {
        this.log(messageTemplate, LogLevel.Verbose, properties);
    }

    //######################### protected methods #########################

    /**
     * Performs log logic
     * @param messageTemplate - Message template of log to be used for logging
     * @param level - Log level to be logged
     * @param properties - Properties provided by message log
     */
    protected log(messageTemplate: string, level: LogLevel, properties?: Record<string, unknown>): void
    {
        const defaultLogLevelSinks = this.options.loggerSinks.filter(itm => isBlank(itm.minimumLogLevel));
        const customLogLevelSinks = this.options.loggerSinks.filter(itm => !isBlank(itm.minimumLogLevel));
        let loggerProperties: Record<string, unknown>;
        const messageLog = new MessageLog(messageTemplate, level, properties ?? {});
        let loggerFilterResult: boolean;

        //only if logger is enabled
        if(loggerEnabled(this.options.minimumLogLevel, level))
        {
            loggerProperties ??= useEnrichers(messageLog, this.options.enrichers);
            loggerFilterResult = (!this.options.filter || this.options.filter(loggerProperties, messageLog));

            if(loggerFilterResult)
            {
                for(const sink of defaultLogLevelSinks)
                {
                    sink.log(this.options, loggerProperties, messageLog);
                }
            }
        }

        //custom log level loggers
        for(const sink of customLogLevelSinks)
        {
            if(loggerEnabled(sink.minimumLogLevel, level))
            {
                loggerProperties ??= useEnrichers(messageLog, this.options.enrichers);
                loggerFilterResult ??= (!this.options.filter || this.options.filter(loggerProperties, messageLog));
                const sinkProperties =
                {
                    ...loggerProperties,
                    ...useEnrichers(messageLog, sink.enrichers ?? []),
                };
                const filter = loggerFilterResult && (!sink.filter || sink.filter(sinkProperties, messageLog));

                if(filter)
                {
                    sink.log(this.options, loggerProperties, messageLog);
                }
            }
        }
    }
}