import {Pipe, PipeTransform} from '@angular/core';
import {isPresent} from '@jscrpt/common';

/**
 * Returns true if object is different from null or undefined
 */
@Pipe(
{
    name: 'isPresent',
    standalone: true,
})
export class IsPresentPipe implements PipeTransform
{
    //######################### public methods #########################

    /**
     * Checks whether is value different from null or undefined
     * @param value - Value to be checked
     */
    public transform(value: unknown): boolean
    {
        return isPresent(value);
    }
}