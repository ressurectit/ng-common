import {Injectable} from '@angular/core';
import {isPresent} from '@jscrpt/common';

import {LogLevel} from '../../types';

/**
 * Options for rest sink
 */
@Injectable({providedIn: 'root', useFactory: () => new RestSinkOptions()})
export class RestSinkOptions
{
    //######################### public properties #########################

    /**
     * Number of seconds after which should be flush called
     */
    public secondsToFlushAfter: number = 300;

    /**
     * Number of logs after which should be flush called
     */
    public flushAfterNumberOfLogs: number = 50;

    /**
     * Minimal log level that will be flushed immediately
     */
    public immediateFlushMinLevel: LogLevel = LogLevel.Error;

    //######################### constructor #########################
    constructor(secondsToFlushAfter?: number,
                flushAfterNumberOfLogs?: number,
                immediateFlushMinLevel?: LogLevel,)
    {
        if(isPresent(secondsToFlushAfter))
        {
            this.secondsToFlushAfter = secondsToFlushAfter;
        }

        if(isPresent(flushAfterNumberOfLogs))
        {
            this.flushAfterNumberOfLogs = flushAfterNumberOfLogs;
        }

        if(isPresent(immediateFlushMinLevel))
        {
            this.immediateFlushMinLevel = immediateFlushMinLevel;
        }
    }
}
