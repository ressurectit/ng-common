import {isPresent} from '@jscrpt/common';

/**
 * Configuration object that is used by `Notifications` default implementation
 */
export class NotificationsOptions
{
    //######################### public properties #########################
    
    /**
     * Timeout in ms, after which will be notification closed, if set to 0, message will stay permanently until closed by user
     */
    public timeout: number = 10000;
    
    //######################### constructor #########################
    constructor(timeout?: number)
    {
        if(isPresent(timeout))
        {
            this.timeout = timeout;
        }
    }
}