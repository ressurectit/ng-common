import {computed, Injectable, isSignal, signal, Signal} from '@angular/core';
import {formatString} from '@jscrpt/common';

import {StringLocalization} from './stringLocalization.interface';

/**
 * Default implementation of StringLocalization, which uses 'key' as localization text
 */
@Injectable()
export class NoStringLocalization implements StringLocalization
{
    //######################### public methods - implementation of StringLocalization #########################

    /**
     * Gets localized string for specified key, interpolation might be used
     * @param key - Key to be localized
     * @param interpolateParams - Optional object storing interpolation parameters
     */
    public get(key: string|Signal<string>, interpolateParams?: Record<string, any>|Signal<Record<string, any>>|null): Signal<string>
    {
        if(!interpolateParams)
        {
            if(isSignal(key))
            {
                return key;
            }

            return signal(key);
        }

        return computed(() => formatString(isSignal(key) ? key() : key, isSignal(interpolateParams) ? interpolateParams() : interpolateParams));
    }
}
