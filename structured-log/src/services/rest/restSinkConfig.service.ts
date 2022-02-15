import {Injectable, Inject, Injector} from '@angular/core';
import {isBlank} from '@jscrpt/common';
import {LogEventLevel} from 'structured-log';

/**
 * Service used as configuration for *rest sink*
 */
@Injectable({providedIn: 'root', useFactory: () => new RestSinkConfigService()})
export class RestSinkConfigService
{
    //######################### constructor #########################

    /**
     * Creates instance of `RestSinkConfigService`
     * @param secondsToFlushAfter - Number of seconds after which should be flush called
     * @param flushAfterNumberOfLogs - Number of logs after which should be flush called
     * @param immediateFlushMinLevel - Minimal log level that will be flushed immediately
     * @param restrictToLevel - Minimal log level to be displayed
     */
    constructor(@Inject(Injector) public secondsToFlushAfter?: number,
                @Inject(Injector) public flushAfterNumberOfLogs?: number,
                @Inject(Injector) public immediateFlushMinLevel?: LogEventLevel,
                @Inject(Injector) public restrictToLevel?: LogEventLevel)
    {
        if(isBlank(secondsToFlushAfter))
        {
            this.secondsToFlushAfter = 300;
        }

        if(isBlank(flushAfterNumberOfLogs))
        {
            this.flushAfterNumberOfLogs = 50;
        }

        if(isBlank(immediateFlushMinLevel))
        {
            this.immediateFlushMinLevel = LogEventLevel.error;
        }

        if(isBlank(restrictToLevel))
        {
            this.restrictToLevel = LogEventLevel.warning;
        }
    }
}