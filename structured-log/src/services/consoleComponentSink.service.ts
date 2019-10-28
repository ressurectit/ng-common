import {Sink, LogEvent, LogEventLevel} from "structured-log";
import {Observable, Subject} from "rxjs";

import {ConsoleComponentSink, ConsoleComponentLog} from "../types/logger.interface";
import {toText} from "../misc/utils";

//TODO - set max length from configuration
//TODO - also provide way to set restricted level

/**
 * Maximal number of logs that could be stored
 */
const MAX_LOGS: number = 1500;

/**
 * Sink that is used for storing logs in `ConsoleComponent`
 */
export class ConsoleComponentSinkService implements Sink, ConsoleComponentSink
{
    //######################### private fields #########################

    /**
     * Indication that prototype of MessageTemplate was updated
     */
    private _prototypeUpdated: boolean = false;

    /**
     * Array of current logs
     */
    private _currentLogs: ConsoleComponentLog[] = [];

    /**
     * Subject used for indicating logs change
     */
    private _logsChangeSubject: Subject<void> = new Subject<void>();

    //######################### public properties - implementation of ConsoleComponentSink #########################

    /**
     * Occurs when logs change
     */
    public get logsChange(): Observable<void>
    {
        return this._logsChangeSubject.asObservable();
    }

    /**
     * Gets current logs
     */
    public get logs(): ConsoleComponentLog[]
    {
        return this._currentLogs;
    }

    //######################### public methods - implementation of ConsoleComponentSink #########################

    /**
     * Clears all current logs
     */
    public clear()
    {
        this._currentLogs = [];
        this._logsChangeSubject.next();
    }

    //######################### public methods - implementation of Sink #########################

    public emit(events: LogEvent[])
    {
        if(!events || !events.length)
        {
            return;
        }

        events.forEach(e =>
        {
            if(!this._prototypeUpdated)
            {
                this._updatePrototype(e);

                this._prototypeUpdated = true;
            }

            // if (!isEnabled(this.options.restrictedToMinimumLevel, e.level))
            // {
            //     return;
            // }

            let logLevel = LogEventLevel[e.level];
            let output = `${e.timestamp} [${logLevel.toUpperCase()}] ${e.messageTemplate.render(e.properties)}`;

            this._currentLogs.push(
            {
                text: output,
                logLevel: logLevel
            });

            //TRIM LOGS
            if(this._currentLogs.length > MAX_LOGS)
            {
                let removeCount = this._currentLogs.length - MAX_LOGS;

                this._currentLogs.splice(0, removeCount);
            }

            this._logsChangeSubject.next();
        });
    }

    public flush(): Promise<any>
    {
        return Promise.resolve();
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