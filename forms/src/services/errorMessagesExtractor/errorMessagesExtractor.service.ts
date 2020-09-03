import {Injectable, Inject, Optional, Injector} from '@angular/core';
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

    /**
     * String localization service
     */
    protected _stringLocalization: StringLocalization;

    //######################### constructor #########################
    constructor(injector: Injector,
                @Inject(VALIDATION_ERROR_MESSAGES) @Optional() globalErrorMessages?: StringDictionary)
    {
        this._errorMessages = extend(true, {}, defaultErrorMessages, globalErrorMessages);
        this._stringLocalization = injector.get(STRING_LOCALIZATION);
    }

    //######################### public methods #########################

    /**
     * Gets validation errors result for provided control, or null of no errors are present
     * @param control - Form control instance that should be inspected for errors
     * @param messages - Object containing error messages that should patch existing error messages
     */
    public getErrors(control: FormControl, messages?: StringDictionary): ValidationErrorsResult
    {
        let errorMessages: StringDictionary = extend(true, {}, this._errorMessages, messages);

        //no control or no errors
        if(!control || !control.errors)
        {
            return null;
        }

        let result: ValidationErrorsResult =
        {
            errors: Object.keys(control.errors),
            errorMessages: []
        };

        result.errors.forEach(error =>
        {
            let errorData = control.errors[error];
            
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