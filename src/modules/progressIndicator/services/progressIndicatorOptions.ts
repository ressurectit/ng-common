import {isPresent} from '@jscrpt/common';

/**
 * Configuration object that is used by ProgressIndicatorService, overriding its properties allows you to customize configuration
 */
export class ProgressIndicatorOptions
{
    //######################### public properties #########################

    /**
     * Timeout length after which will be progress indication displayed
     */
    public timeout: number = 220;

    /**
     * Indication whether fallback to default group name
     */
    public fallbackToDefault: boolean = true;

    //######################### constructor #########################
    constructor(timeout?: number, fallbackToDefault?: boolean)
    {
        if(isPresent(timeout))
        {
            this.timeout = timeout as number;
        }

        if(isPresent(fallbackToDefault))
        {
            this.fallbackToDefault = fallbackToDefault as boolean;
        }
    }
}