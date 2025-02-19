import {Pipe, PipeTransform} from '@angular/core';
import {Dictionary, isBlank, isString} from '@jscrpt/common';

/**
 * Type of css class definition for NgClass and merge
 */
export type NgClassType = string | string[] | Dictionary<boolean>;

/**
 * Merges css classes that will be passed to ngClass
 */
@Pipe({name: 'mergeCssClasses'})
export class MergeCssClassesPipe implements PipeTransform
{
    /**
     * Merges css classes that will be passed to ngClass
     * @param value - Css class to be merged
     * @param mergeClasses - Definition of css classes that will be merged
     */
    public transform(value: NgClassType|undefined|null, mergeClasses: (NgClassType|undefined|null)[]): Dictionary<boolean>
    {
        const result: Dictionary<boolean> = {};

        function updateResult(val: NgClassType|undefined|null): void
        {
            if(isBlank(val))
            {
                return;
            }

            if(isString(val))
            {
                result[val] = true;
            }
            else if(Array.isArray(val))
            {
                val.forEach(cssClass =>
                {
                    result[cssClass] = true;
                });
            }
            else
            {
                Object.keys(val).forEach(cssClass =>
                {
                    result[cssClass] = val[cssClass];
                });
            }
        }

        updateResult(value);

        mergeClasses.forEach(itm =>
        {
            updateResult(itm);
        });

        return result;
    }
}