import {Injectable} from '@angular/core';
import {isPresent} from '@jscrpt/common';

/**
 * Maximal number of logs that can be stored
 */
const MAX_LOGS: number = 1500;

/**
 * Options for *console sink component*
 */
@Injectable({providedIn: 'root', useFactory: () => new ConsoleComponentSinkOptions()})
export class ConsoleComponentSinkOptions
{
    //######################### public properties #########################

    /**
     * Maximal number of logs that can be stored
     */
    public maxLogsCount: number = MAX_LOGS;

    //######################### constructor #########################
    constructor(maxLogsCount?: number)
    {
        if(isPresent(maxLogsCount))
        {
            this.maxLogsCount = maxLogsCount;
        }
    }
}
