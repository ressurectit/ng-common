import {Pipe, PipeTransform} from '@angular/core';
import {AbstractControl, FormArray, FormGroup} from '@angular/forms';
import {isBlank} from '@jscrpt/common';

/**
 * Gets control from `FormGroup` or `FormArray`
 */
@Pipe({name: 'getControl'})
export class GetControlPipe implements PipeTransform
{
    /**
     * Gets control from `FormGroup` or `FormArray`
     * @param value - FormGroup which contains requested control
     * @param control - Control name to be obtained
     * @param _valueHash - Parameter that can be used to change value, indicates that pipe input value has changed
     */
    public transform<TModel, TKey extends keyof TModel>(value: AbstractControl<TModel>, control: TKey, _valueHash?: unknown): AbstractControl<TModel[TKey]>|null
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