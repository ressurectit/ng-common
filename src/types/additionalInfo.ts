import {Dictionary} from '@jscrpt/common';

/**
 * Object containing additional info/data
 */
export interface AdditionalInfo<TAdditional = any, TItem = any>
{
    /**
     * Additional info object
     */
    additionalInfo?: Dictionary<TItem> & TAdditional;
}
