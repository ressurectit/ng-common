import {Pipe, PipeTransform} from '@angular/core';
import {AbstractControl, FormArray, FormGroup} from '@angular/forms';
import {isBlank} from '@jscrpt/common';

/**
 * Gets control from `FormGroup`
 */
@Pipe({name: 'getControl'})
export class GetControlPipe<TFormGroup> implements PipeTransform
{
    /**
     * Gets control from `FormGroup`
     * @param value - FormGroup which contains requested control
     * @param control - Control name to be obtained
     * @param _valueHash - Parameter that can be used to change value, indicates that pipe input value has changed
     */
    public transform(value: AbstractControl, control: keyof TFormGroup, _valueHash?: any): AbstractControl|null
    {
        if(isBlank(value))
        {
            return null;
        }

        if(!(value instanceof FormArray) && !(value instanceof FormGroup))
        {
            return null;
        }

        return value.get(control as string);
    }
}