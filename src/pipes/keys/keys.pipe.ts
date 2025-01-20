import {Pipe, PipeTransform} from '@angular/core';
import {Dictionary, isBlank} from '@jscrpt/common';

/**
 * Gets object keys/property names
 */
@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform
{
    /**
     * Gets object keys/property names
     * @param value - Object containing keys which will be obtained
     */
    public transform(value: Dictionary<any>): string[]
    {
        if(isBlank(value))
        {
            return [];
        }

        return Object.keys(value);
    }
}
