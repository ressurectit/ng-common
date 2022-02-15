import {Injectable, Inject, Injector} from "@angular/core";
import {isBlank} from "@jscrpt/common";
import {LogEventLevel} from 'structured-log';

/**
 * Maximal number of logs that can be stored
 */
const MAX_LOGS: number = 1500;

/**
 * Service used as configuration for *console sink component*
 */
@Injectable({providedIn: 'root', useFactory: () => new ConsoleSinkConfigService()})
export class ConsoleSinkConfigService
{
    //######################### constructor #########################

    /**
     * Creates instance of `ConsoleSinkConfigService`
     * @param maxLogsCount - Maximal number of logs that can be stored
     * @param restrictToLevel - Minimal log level to be displayed
     */
    constructor(@Inject(Injector) public maxLogsCount?: number, @Inject(Injector) public restrictToLevel?: LogEventLevel)
    {
        if(isBlank(maxLogsCount))
        {
            this.maxLogsCount = MAX_LOGS;
        }

        if(isBlank(restrictToLevel))
        {
            this.restrictToLevel = LogEventLevel.verbose;
        }
    }
}