import {Pipe, PipeTransform} from '@angular/core';

/**
 * Converts first letter of text to uppercase
 */
@Pipe(
{
    name: 'firstUppercase',
    standalone: true,
})
export class FirstUppercaseSAPipe implements PipeTransform
{
    /**
     * Converts first letter of text to uppercase
     * @param value - Value to be converted
     */
public transform<TValue extends string|undefined|null>(value: TValue): TValue 
    {
        if(!value)
        {
            return value;
        }

        return value[0].toUpperCase() + value.substring(1) as TValue;
    }
}