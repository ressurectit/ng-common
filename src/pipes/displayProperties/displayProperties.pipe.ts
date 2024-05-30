import {Pipe, PipeTransform} from '@angular/core';

/**
 * Transforms array of objects or object properties into string
 */
@Pipe(
{
    name: 'displayProperties',
    standalone: true,
})
export class DisplayPropertiesPipe<TItem> implements PipeTransform
{
    /**
     * Transforms array of objects or object properties into string
     * @param value - Array of objects or object to be converted
     * @param separators - Array of separators, or single separator for properties
     * @param itemSeparator - Separator used for separating items
     */
    public transform(value: TItem|TItem[], values: Array<keyof TItem>, separators: string[] = [' '], itemSeparator: string = ', '): string
    {
        if(!value)
        {
            return '';
        }

        if(!Array.isArray(value))
        {
            value = [value];
        }

        return value.map(itm =>
        {
            let result: string = '';

            for(let x = 0; x < values.length - 1; x++)
            {
                result += itm[values[0]] + separators[0];
            }

            result += itm[values[values.length - 1]];

            return result;
        }).join(itemSeparator);
    }
}