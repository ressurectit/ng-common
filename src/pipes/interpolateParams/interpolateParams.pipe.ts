import {Pipe, PipeTransform} from '@angular/core';

import {LocalizationString} from '../../types/classes';

/**
 * Gets localization interpolation parameters from `LocalizationString`
 */
@Pipe({name: 'interpolateParams'})
export class InterpolateParamsPipe implements PipeTransform
{
    /**
     * Gets localization interpolation parameters from `LocalizationString`
     * @param value - String or localization string
     */
    public transform(value: string|LocalizationString|undefined|null): object
    {
        if(value instanceof LocalizationString)
        {
            return value.interpolateParams ?? {};
        }

        return {};
    }
}
