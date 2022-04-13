import {Injectable, Inject, Optional} from '@angular/core';
import {FormControl} from '@angular/forms';
import {StringLocalization, STRING_LOCALIZATION} from '@anglr/common';
import {StringDictionary, extend, isString} from '@jscrpt/common';

import {VALIDATION_ERROR_MESSAGES} from '../../misc/types';
import {ValidationErrorsResult} from './errorMessagesExtractor.interface';

/**
 * Default error messages displayed
 */
const defaultErrorMessages: StringDictionary =
{
    required: 'Field is required.',
    number: 'Value must be number.',
    pattern: 'Value is not valid.',
    minValue: 'Value is too small.',
    maxValue: 'Value is too big.',
    minlength: 'Value is short.',
    maxlength: 'Value is too long.'
};

//TODO: support exceptions for error names, allow to have string value to be used as error from error

/**
 * Service used for extracting error messages from form control
 */
@Injectable({providedIn: 'root'})
export class ErrorMessagesExtractor
{
    //######################### protected fields #########################

    /**
     * Dictionary with error names that have defined message
     */
    protected _errorMessages: StringDictionary;

    //######################### constructor #########################
    constructor(@Inject(STRING_LOCALIZATION) protected _stringLocalization: StringLocalization,
                @Inject(VALIDATION_ERROR_MESSAGES) @Optional() globalErrorMessages?: StringDictionary)
    {
        this._errorMessages = extend(true, {}, defaultErrorMessages, globalErrorMessages);
    }

    //######################### public methods #########################

    /**
     * Gets validation errors result for provided control, or null of no errors are present
     * @param control - Form control instance that should be inspected for errors
     * @param messages - Object containing error messages that should patch existing error messages
     */
    public getErrors(control: FormControl, messages?: StringDictionary): ValidationErrorsResult
    {
        const errorMessages: StringDictionary = extend(true, {}, this._errorMessages, messages);

        //no control or no errors
        if(!control || !control.errors)
        {
            return null;
        }

        const result: ValidationErrorsResult =
        {
            errors: Object.keys(control.errors),
            errorMessages: []
        };

        result.errors.forEach(error =>
        {
            const errorData = control.errors[error];
            
            //error message is present for error
            if(errorMessages[error])
            {
                result.errorMessages.push(this._stringLocalization.get(errorMessages[error], control.errors));
            }
            //error data are array of strings, each string is considered error message
            else if(Array.isArray(errorData))
            {
                errorData.forEach(errorItm =>
                {
                    if(isString(errorItm))
                    {
                        result.errorMessages.push(this._stringLocalization.get(errorItm, control.errors));
                    }
                });
            }
        });

        return result;
    }
}