import {Injectable, Inject} from "@angular/core";
import {APP_STABLE} from '@anglr/common';
import {isPresent} from '@jscrpt/common';
import {Sink, LogEvent, LogEventLevel} from "structured-log";

import {toText, isEnabled} from "../../misc/utils";
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
    private _timer: number;

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
            }, this._configSvc.secondsToFlushAfter * 1000) as any;
        });
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
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
    public emit(events: LogEvent[])
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

            let logLevel = LogEventLevel[e.level].toUpperCase();
            let timestamp = e.timestamp;
            let message = e.messageTemplate.render(e.properties);

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
        let promise: Promise<void>;

        //no logs available
        if(!this._logs.length)
        {
            return Promise.resolve(null);
        }

        try
        {
            promise = this._restClient.log(this._logs).toPromise();
        }
        catch(e)
        {
            console.log(e);
        }

        this._logs = [];

        return promise ?? Promise.resolve(null);
    }

    //######################### private methods #########################

    /**
     * Updates prototype of MessageTemplate
     */
    private _updatePrototype(e: LogEvent)
    {
        let messageTemplateInstance = (<any>e.messageTemplate);

        if(messageTemplateInstance.constructor && messageTemplateInstance.constructor.prototype && messageTemplateInstance.constructor.prototype.toText)
        {
            messageTemplateInstance.constructor.prototype.toText = toText;
        }
    }
}