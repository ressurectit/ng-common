import {Injectable, Optional} from '@angular/core';
import {Sink, LogEvent, LogEventLevel} from 'structured-log';

import {toText, isEnabled} from '../../misc/utils';
import {DeveloperConsoleSinkOptions} from './developerConsoleSink.options';

/**
 * Sink that is used for storing logs using browser developer console
 */
@Injectable()
export class DeveloperConsoleSinkService implements Sink
{
    //######################### private fields #########################

    /**
     * Indication that prototype of MessageTemplate was updated
     */
    private _prototypeUpdated: boolean = false;

    /**
     * Options for this sink
     */
    private _config: DeveloperConsoleSinkOptions;

    //######################### constructor #########################
    constructor(@Optional() config?: DeveloperConsoleSinkOptions,)
    {
        if(!config || !(config instanceof DeveloperConsoleSinkOptions))
        {
            this._config = new DeveloperConsoleSinkOptions();
        }
        else
        {
            this._config = config;
        }
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

        events.forEach(e =>
        {
            if(!this._prototypeUpdated)
            {
                this._updatePrototype(e);

                this._prototypeUpdated = true;
            }

            if (!isEnabled(this._config.restrictToLevel, e.level))
            {
                return;
            }

            const logLevel = LogEventLevel[e.level].toUpperCase();
            const timestamp = e.timestamp;
            const message = e.messageTemplate.render(e.properties);
            const fullMessage = `%cLOGGER: ${logLevel} - ${timestamp}: ${message}`;

            switch(e.level)
            {
                default:
                case LogEventLevel.off:
                {
                    break;
                }
                case LogEventLevel.error:
                case LogEventLevel.fatal:
                {
                    this._writeLog(fullMessage, 'FF3131');

                    break;
                }
                case LogEventLevel.verbose:
                case LogEventLevel.debug:
                {
                    this._writeLog(fullMessage, '31A1FF');

                    break;
                }
                case LogEventLevel.information:
                {
                    this._writeLog(fullMessage, 'ffffff');

                    break;
                }
                case LogEventLevel.warning:
                {
                    this._writeLog(fullMessage, 'FFC531');

                    break;
                }
            }
        });
    }

    /**
     * Flushes logs
     */
    public flush(): Promise<void>
    {
        return Promise.resolve();
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

    /**
     * Writes message to log
     * @param fullMessage - Full message to be written
     * @param color - Color of message
     */
    private _writeLog(fullMessage: string, color: string): void
    {
        const index = fullMessage.indexOf('\n');

        if(index >= 0)
        {
            const firstLine = fullMessage.slice(0, index);
            const restLines = fullMessage.slice(index + 1);

            console.groupCollapsed(firstLine,  `color: #${color};`);
            console.log(restLines, `color: #${color};`);
            console.groupEnd();
        }
        else
        {
            console.log(fullMessage, `color: #${color};`);
        }
    }
}