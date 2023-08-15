import {Pipe, PipeTransform} from '@angular/core';
import {serializeToUrlQuery} from '@jscrpt/common';

/**
 * Pipe that encodes data for url
 */
@Pipe({name: 'urlEncode', standalone: true})
export class UrlEncodeSAPipe implements PipeTransform
{
    //######################### public methods #########################
    
    /**
     * Encodes data for URL
     * @param value - Value to be encoded
     */   
    public transform(value: object): string
    {
        if(!value)
        {
            return '';
        }

        return serializeToUrlQuery(value);
    }
}

