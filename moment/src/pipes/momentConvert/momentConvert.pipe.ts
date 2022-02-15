import {Pipe, PipeTransform} from "@angular/core";
import {isPresent} from "@jscrpt/common";
import moment from 'moment';

/**
 * Performs moment conversion
 */
@Pipe(
{
    name: "momentConvert"
})
export class MomentConvertPipe implements PipeTransform
{
    //######################### public methods #########################

    /**
     * Transforms 'date' string to moment
     * @param value - Value to be converted to moment
     */
    public transform(value: string | moment.Moment): moment.Moment
    {
        if(isPresent(value))
        {
            value = moment(value);
        
            if(!value.isValid)
            {
                value = null;
            }
        }

        return value as moment.Moment;
    }
}