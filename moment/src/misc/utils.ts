import {readEncodedFilter} from '@anglr/common/forms';
import {isString} from '@jscrpt/common';
import moment from 'moment';

/**
 * Reads filter value from encoded string, deserialize date properties into moment
 * @param defaultValue Default value of filter, which is overriden by values from filterValue
 * @param filterValue Encoded string containing filter value
 * @param offsetCorrelation Indication whether perform timezone offset correlation, defaults to true
 */
export function readEncodedFilterWithDates<TFilter>(defaultValue: TFilter, filterValue: string, offsetCorrelation: boolean = true): TFilter
{
    let dateRegex = /^(\d+-){2}\d+(T(\d+:){2}\d+(\.\d+)?)?/g;

    return readEncodedFilter(defaultValue, filterValue, (_key, value) =>
    {
        //it is date value
        if(isString(value) && dateRegex.test(value))
        {
            let val = moment(value);
        
            if(!val.isValid)
            {
                return null;
            }

            if(offsetCorrelation)
            {
                return val.subtract(val.utcOffset(), 'minutes');
            }

            return val;
        }

        return value;
    });
}