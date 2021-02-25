import {NgForm, FormGroup} from '@angular/forms';
import {deserializeFromUrlQuery, extend, isJsObject} from '@jscrpt/common';

/**
 * Gets indication whether controls have errors, with custom indication of submitted
 * @param form - Form containing controls
 * @param controls - Array of controls names to be checked for errors
 * @param submitted - Indication whether form was submitted
 */
export function hasErrorCustom(form: NgForm|FormGroup, controls: string[], submitted: boolean = false)
{
    let conditionValid = false;
    let conditionChanged = false;

    for(var x = 0; x < controls.length; x++)
    {
        if(!form.controls[controls[x]])
        {
            return false;
        }

        conditionValid = conditionValid || !form.controls[controls[x]].valid;
        conditionChanged = conditionChanged || form.controls[controls[x]].dirty;
    }

    return conditionValid && (conditionChanged || submitted);
}

/**
 * Gets indication whether hide alerts or not for control, with custom indication of submitted
 * @param form - Form containing controls
 * @param control - Controls name that will be checked
 * @param errors - Array of validation errors to be checked for existance
 * @param submitted - Indication whether form was submitted
 */
export function alertHiddenCustom(form: NgForm|FormGroup, control: string, errors: string[] = [], submitted: boolean = false)
{
    if(!form.controls[control])
    {
        return true;
    }

    let requestedErrors = false;

    errors.forEach(errorType =>
    {
        requestedErrors = requestedErrors || (!!form.controls[control].errors && !!(<{[key: string]: any}>form.controls[control].errors)[errorType]);
    });

    return form.controls[control].valid || !requestedErrors || (!form.controls[control].dirty && !submitted);
}

/**
 * Gets indication whether controls have errors
 * @param form - Form containing controls
 * @param controls - Array of controls names to be checked for errors
 */
export function hasError(form: NgForm, controls: string[])
{
    let conditionValid = false;
    let conditionChanged = false;

    for(var x = 0; x < controls.length; x++)
    {
        if(!form.controls[controls[x]])
        {
            return false;
        }

        conditionValid = conditionValid || !form.controls[controls[x]].valid;
        conditionChanged = conditionChanged || form.controls[controls[x]].dirty;
    }

    return conditionValid && (conditionChanged || form.submitted);
}

/**
 * Gets indication whether hide alerts or not for control
 * @param form - Form containing controls
 * @param control - Controls name that will be checked
 * @param errors - Array of validation errors to be checked for existance
 */
export function alertHidden(form: NgForm, control: string, errors: string[] = [])
{
    if(!form.controls[control])
    {
        return true;
    }

    let requestedErrors = false;

    errors.forEach(errorType =>
    {
        requestedErrors = requestedErrors || (!!form.controls[control].errors && !!(<{[key: string]: any}>form.controls[control].errors)[errorType]);
    });

    return form.controls[control].valid || !requestedErrors || (!form.controls[control].dirty && !form.submitted);
}

/**
 * Prepares object for form builder, wraps each property in array
 * @param value Object which properties will be wrapped to array
 */
export function prepareForFormBuilder(value: Object)
{
    let result = {};

    Object.keys(value).forEach(prop =>
    {
        let val = value[prop];

        //recursively wrap nested object properties
        if(isJsObject(val) && !Array.isArray(val))
        {
            result[prop] = prepareForFormBuilder(val);
        }
        else
        {
            result[prop] = [val];
        }
    });

    return result;
}

/**
 * Reads filter value from encoded string
 * @param defaultValue Default value of filter, which is overriden by values from filterValue
 * @param filterValue Encoded string containing filter value
 * @param reviver A function that transforms the results. This function is called for each member of the object.
 */
export function readEncodedFilter<TFilter>(defaultValue: TFilter, filterValue: string, reviver?: (this: any, key: string, value: any) => any): TFilter
{
    try
    {
        return extend(true, defaultValue, deserializeFromUrlQuery(filterValue, reviver));
    }
    catch(e)
    {
        console.warn("Failed to deserialize filter from encoded string! Exc:" + e);

        return defaultValue;
    }
}