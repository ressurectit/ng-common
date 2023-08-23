import {LoggerEnricher, LoggerFilter, LoggerSink} from '../../interfaces';
import {MinLogLevelGetter} from '../../misc';
import {LoggerOptions, MessageLog} from '../../types';

/**
 * Sink that is used as sub logger
 */
export class SubLoggerSink implements LoggerSink
{
    //######################### public properties - implementation of LoggerSink #########################

    /**
     * @inheritdoc
     */
    public get enrichers(): LoggerEnricher[]
    {
        return this.loggerOptions.enrichers;
    }

    /**
     * @inheritdoc
     */
    public get filter(): LoggerFilter|undefined|null
    {
        return this.loggerOptions.filter;
    }

    /**
     * @inheritdoc
     */
    public get minimumLogLevel(): MinLogLevelGetter|undefined|null
    {
        return this.loggerOptions.minimumLogLevel;
    }

    //######################### constructor #########################
    constructor(protected loggerOptions: LoggerOptions,)
    {

    }

    //######################### public methods - implementation of LoggerSink #########################

    /**
     * @inheritdoc
     */
    public log(options: LoggerOptions, loggerProperties: Record<string, unknown>, messageLog: MessageLog<Record<string, unknown>>): void
    {
        for(const sink of this.loggerOptions.loggerSinks)
        {
            sink.log({
                         enrichers: [],
                         filter: undefined,
                         loggerSinks: [],
                         messageLengthLimit: this.loggerOptions.messageLengthLimit ?? options.messageLengthLimit,
                         messageTemplate: this.loggerOptions.messageTemplate ?? options.messageTemplate,
                         minimumLogLevel: undefined,
                     },
                     loggerProperties,
                     messageLog,);
        }
    }
}