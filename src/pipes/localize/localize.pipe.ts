import {Pipe, PipeTransform, inject, Signal} from '@angular/core';
import {isBlank} from '@jscrpt/common';

import {STRING_LOCALIZATION} from '../../types/tokens';
import {StringLocalization} from '../../services/stringLocalization';
import {LocalizationString} from '../../types/classes';

/**
 * Localize strings using 'StringLocalization'
 */
@Pipe(
{
    name: 'localize',
    pure: false,
})
export class LocalizePipe implements PipeTransform
{
    //######################### protected fields #########################

    /**
     * Instance of localization service
     */
    protected localizationSvc: StringLocalization = inject(STRING_LOCALIZATION);

    /**
     * Cached signal translation value
     */
    protected cachedSignal: Signal<string>|undefined|null;

    /**
     * Last value of used key
     */
    protected lastKey: string|LocalizationString|undefined|null;

    /**
     * Last value of interpolation parameters
     */
    protected lastParams: Record<string, any>|undefined|null;

    //######################### public methods #########################

    /**
     * Gets localized string for specified key, interpolation might be used
     * @param key - Key to be localized
     * @param interpolateParams - Optional object storing interpolation parameters
     */
    public transform(key: string|LocalizationString|undefined|null, interpolateParams?: Record<string, any>|null): string
    {
        if(isBlank(key) || key === '')
        {
            return '';
        }

        //TODO: maybe in future add lodash to check also key changes using equal
        if(key !== this.lastKey || interpolateParams != this.lastParams)
        {
            this.cachedSignal = this.localizationSvc.get(key.toString(), (key instanceof LocalizationString) ? key.interpolateParams : interpolateParams);
            this.lastKey = key;
            this.lastParams = interpolateParams;
        }

        return this.cachedSignal!();
    }
}
