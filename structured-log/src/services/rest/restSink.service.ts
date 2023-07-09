import {Injectable, Inject} from '@angular/core';
import {APP_STABLE} from '@anglr/common';
import {isPresent} from '@jscrpt/common';
import {Sink, LogEvent, LogEventLevel} from 'structured-log';
import {lastValueFrom} from 'rxjs';

import {toText, isEnabled} from '../../misc/utils';
import {RestSinkConfigService} from './restSinkConfig.service';
import {LOGGER_REST_CLIENT} from '../../types/tokens';
import {LoggerRestClient, RestLog} from '../../types/logger.interface';

/**
 * Sink that is used for storing logs using REST
 */
@Injectable()
export class RestSinkService implements Sink
{
    //######################### private fields #########################

    /**
     * Indication that prototype of MessageTemplate was updated
     */
    private _prototypeUpdated: boolean = false;

    /**
     * Array of unflushed logs
     */
    private _logs: RestLog[] = [];

    /**
     * Interval timer id
     */
    private _timer: number|undefined|null;

    //######################### constructor #########################
    constructor(private _configSvc: RestSinkConfigService,
                @Inject(APP_STABLE) isStable: Promise<void>,
                @Inject(LOGGER_REST_CLIENT) private _restClient: LoggerRestClient)
    {
        isStable.then(() =>
        {
            this._timer = setInterval(() =>
            {
                this.flush();
            }, (this._configSvc.secondsToFlushAfter ?? 0) * 1000) as any;
        });
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        if(isPresent(this._timer))
        {
            clearInterval(this._timer);
        }

        this.flush();
    }

    //######################### public methods - implementation of Sink #########################

    /**
     * Emits events into log
     * @param events - Events to be emitted
     */
    public emit(events: LogEvent[]): void
    {
        if(!events || !events.length)
        {
            return;
        }

        let forceFlush = false;

        events.forEach(e =>
        {
            if(!this._prototypeUpdated)
            {
                this._updatePrototype(e);

                this._prototypeUpdated = true;
            }

            if (!isEnabled(this._configSvc.restrictToLevel, e.level))
            {
                return;
            }

            const logLevel = LogEventLevel[e.level].toUpperCase();
            const timestamp = e.timestamp;
            const message = e.messageTemplate.render(e.properties);

            this._logs.push(
            {
                logLevel,
                message,
                timestamp
            });

            if (isEnabled(this._configSvc.immediateFlushMinLevel, e.level))
            {
                forceFlush = true;
            }
        });

        //flush if number of records is bigger than max or flush is required
        if(forceFlush || this._logs.length >= this._configSvc.flushAfterNumberOfLogs)
        {
            this.flush();
        }
    }

    /**
     * Flushes logs
     */
    public flush(): Promise<void>
    {
        let promise: Promise<void>|undefined;

        //no logs available
        if(!this._logs.length)
        {
            return Promise.resolve();
        }

        try
        {
            promise = lastValueFrom(this._restClient.log(this._logs));
        }
        catch(e)
        {
            console.log(e);
        }

        this._logs = [];

        return promise ?? Promise.resolve();
    }

    //######################### private methods #########################

    /**
     * Updates prototype of MessageTemplate
     */
    private _updatePrototype(e: LogEvent): void
    {
        const messageTemplateInstance = (<any>e.messageTemplate);

        if(messageTemplateInstance.constructor && messageTemplateInstance.constructor.prototype && messageTemplateInstance.constructor.prototype.toText)
        {
            messageTemplateInstance.constructor.prototype.toText = toText;
        }
    }
}