import {Type} from '@angular/core';
import {Observable} from 'rxjs';

/**
 * Provides api to localize strings
 */
export interface StringLocalization
{
    /**
     * Occurs when indication that locale has changes and strings should be obtained again, because they have changed
     */
    readonly textsChange: Observable<void>;

    /**
     * Gets localized string for specified key, interpolation might be used
     * @param key - Key to be localized
     * @param interpolateParams - Optional object storing interpolation parameters
     */
    get(key: string, interpolateParams?: Object): string;
}

/**
 * Used for restriction of string localization provider type only for type decorated with string localization provider
 */
export interface StringLocalizationType extends Type<unknown>
{
}