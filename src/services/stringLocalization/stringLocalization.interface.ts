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
     * @param syncRead - Indication whether perform sync read, that means value will be available right away, but it will not be updated when language change
     */
    get(key: string|Signal<string>, interpolateParams?: Record<string, any>|Signal<Record<string, any>>|null, syncRead?: boolean): Signal<string>;
}
