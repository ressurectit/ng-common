import {inject} from '@angular/core';
import {isPresent} from '@jscrpt/common';
import {lastValueFrom} from 'rxjs';

import {RestSinkOptions} from './restSink.options';
import {SinkType} from '../../decorators';
import {LoggerRestClient, LoggerSink, RestLog} from '../../interfaces';
import {APP_STABLE} from '../../../../utils';
import {LOGGER_REST_CLIENT, loggerEnabled} from '../../misc';
import {LogLevel, LoggerOptions, MessageLog} from '../../types';

/**
 * Sink that is used for storing logs using REST
 */
@SinkType()
export class RestSink implements LoggerSink
{
    //######################### protected fields #########################

    /**
     * Array of unflushed logs
     */
    protected logs: RestLog[] = [];

    /**
     * Interval timer id
     */
    protected timer: number|undefined|null;

    /**
     * Configuration options for rest sink
     */
    protected options: RestSinkOptions = inject(RestSinkOptions);

    /**
     * Indication whether is app stable
     */
    protected isStable: Promise<void> = inject(APP_STABLE);

    /**
     * Rest client used for sending logs through REST
     */
    protected restClient: LoggerRestClient = inject(LOGGER_REST_CLIENT);

    //######################### constructor #########################
    constructor()
    {
        if(!(this.options instanceof RestSinkOptions))
        {
            this.options = new RestSinkOptions();
        }

        this.isStable.then(() =>
        {
            this.timer = setInterval(() =>
            {
                this.flush();
            }, (this.options.secondsToFlushAfter ?? 0) * 1000) as any;
        });
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        if(isPresent(this.timer))
        {
            clearInterval(this.timer);
        }

        this.flush();
    }

    //######################### public methods - implementation of Sink #########################

    /**
     * @inheritdoc
     */
    public log(options: LoggerOptions, loggerProperties: Record<string, unknown>, messageLog: MessageLog): void
    {
        let forceFlush = false;

        const fullMessage = `${messageLog.buildMessage(options.messageTemplate ?? '{{messageLog}}', loggerProperties)}`;

        this.logs.push(
        {
            logLevel: LogLevel[messageLog.logLevel],
            message: fullMessage,
            timestamp: messageLog.timestamp,
        });

        if(loggerEnabled(() => this.options.immediateFlushMinLevel, messageLog.logLevel))
        {
            forceFlush = true;
        }

        //flush if number of records is bigger than max or flush is required
        if(forceFlush || this.logs.length >= this.options.flushAfterNumberOfLogs)
        {
            this.flush();
        }
    }

    /**
     * Flushes logs
     */
    protected flush(): Promise<void>
    {
        let promise: Promise<void>|undefined;

        //no logs available
        if(!this.logs.length)
        {
            return Promise.resolve();
        }

        try
        {
            promise = lastValueFrom(this.restClient.log(this.logs));
        }
        catch(e)
        {
            console.log(e);
        }

        this.logs = [];

        return promise ?? Promise.resolve();
    }
}