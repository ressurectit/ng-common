import {isPresent} from '@jscrpt/common';
import {LogEventLevel} from 'structured-log';

/**
 * Options for developer console sink
 */
export class DeveloperConsoleSinkOptions
{
    //######################### public properties #########################

    /**
     * Restricts logs to specified level
     */
    public restrictToLevel?: LogEventLevel;

    //######################### constructor #########################
    constructor(restrictToLevel?: LogEventLevel)
    {
        if(isPresent(restrictToLevel))
        {
            this.restrictToLevel = restrictToLevel;
        }
    }
}