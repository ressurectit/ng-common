import {Inject, Pipe, PipeTransform} from '@angular/core';
import {StringDictionary} from '@jscrpt/common';

import {VALIDATION_ERROR_MESSAGES} from '../../../../misc/tokens';

/**
 * Filters array of errors with messages
 */
@Pipe({name: 'withErrorMessage'})
export class WithErrorMessagePipe implements PipeTransform
{
    //######################### constructor #########################
    constructor(@Inject(VALIDATION_ERROR_MESSAGES) protected _errorMessages: StringDictionary)
    {
    }

    //######################### public methods - implementation of PipeTransform #########################

    /**
     * Filters array of errors with messages
     * @param value - Array of error names
     */
    public transform(value: string[]): string[]
    {
        if(!value?.length)
        {
            return value;
        }

        return value.filter(itm => this._errorMessages[itm]);
    }
}