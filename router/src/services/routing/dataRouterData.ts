import {Injectable} from '@angular/core';
import {DataRouter} from './dataRouter';

/**
 * Class that is used for obtaining complex routed data
 * @deprecated - Do not use this class, use directly DataRouter
 */
@Injectable()
export class DataRouterData
{
    //######################### public properties #########################
    
    /**
     * Value of DataRouter for currently routed page
     */
    public value: Promise<any>;
    
    //######################### constructors #########################
    constructor(dataRouter: DataRouter)
    {
        this.value = dataRouter.valuePromise;
    }
}
