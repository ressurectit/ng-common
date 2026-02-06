import {Signal} from '@angular/core';

/**
 * Api to localize strings
 */
export interface StringLocalization
{
    //######################### methods #########################

    /**
     * Gets localized string for specified key, interpolation might be used
     * @param key - Key to be localized
     * @param interpolateParams - Optional object storing interpolation parameters
     */
    get(key: string|Signal<string>, interpolateParams?: Record<string, any>|Signal<Record<string, any>>|null): Signal<string>;
}
