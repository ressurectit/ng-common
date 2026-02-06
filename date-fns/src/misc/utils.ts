import {readEncodedFilter} from '@anglr/common/forms';
import {isString} from '@jscrpt/common';
import {parseISO} from 'date-fns';

/**
 * Reads filter value from encoded string, deserialize date properties into date
 * @param defaultValue - Default value of filter, which is overriden by values from filterValue
 * @param filterValue - Encoded string containing filter value
 */
export function readEncodedFilterWithDates<TFilter>(defaultValue: TFilter, filterValue: string): TFilter
{
    const dateRegex = /^(\d+-){2}\d+(T(\d+:){2}\d+(\.\d+)?)?/g;

    return readEncodedFilter(defaultValue, filterValue, (_key, value) =>
    {
        //it is date value
        if(isString(value) && dateRegex.test(value))
        {
            const val = parseISO(value);

            //invalid date
            if(isNaN(val.valueOf()))
            {
                return null;
            }

            return val;
        }

        return value;
    });
}