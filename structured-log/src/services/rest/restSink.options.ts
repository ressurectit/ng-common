import {isPresent} from '@jscrpt/common';
import {LogEventLevel} from 'structured-log';

/**
 * Options for rest sink
 */
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
    public immediateFlushMinLevel: LogEventLevel = LogEventLevel.error;

    /**
     * Restricts logs to specified level
     */
    public restrictToLevel: LogEventLevel = LogEventLevel.warning;

    //######################### constructor #########################
    constructor(secondsToFlushAfter?: number,
                flushAfterNumberOfLogs?: number,
                immediateFlushMinLevel?: LogEventLevel,
                restrictToLevel?: LogEventLevel,)
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

        if(isPresent(restrictToLevel))
        {
            this.restrictToLevel = restrictToLevel;
        }
    }
}
