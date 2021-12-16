import {Pipe, PipeTransform} from '@angular/core';
import {isPresent} from '@jscrpt/common';
import moment from 'moment';

/**
 * Performs moment conversion and formats result
 */
@Pipe(
{
    name: 'momentFormat'
})
export class MomentFormatPipe implements PipeTransform
{
    //######################### public methods #########################

    /**
     * Transforms 'date' string to moment and formats it
     * @param value - Value to be converted to moment
     * @param format - Formats used for formatting moment
     */
    public transform(value: string | moment.Moment, format: string = 'L'): string
    {
        if(isPresent(value))
        {
            value = moment(value);
        
            if(!value.isValid)
            {
                value = null;
            }
        }

        if(value)
        {
            return (value as moment.Moment).format(format);
        }

        return null;
    }
}