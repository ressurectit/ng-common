import {Inject, Optional, Pipe} from '@angular/core';
import {AbstractControl, FormArray} from '@angular/forms';
import {Logger, LOGGER} from '@anglr/common';
import {isBlank} from '@jscrpt/common';

import {AsFormArray} from '../../../../misc/types';

/**
 * Tries to convert `AbstractControl` to `FormArray`
 */
@Pipe({name: 'asFormArray'})
export class AsFormArrayPipe
{
    //######################### constructors #########################
    constructor(@Optional() @Inject(LOGGER) private _logger?: Logger)
    {
    }

    //######################### public methods - implementation of PipeTransform #########################

    /**
     * Allows casting of `AbstractControl` to `FormArray`
     * @param value - `AbstractControl` to be cast to `FormArray`
     * @param _valueHash - Parameter that can be used to change value, indicates that pipe input value has changed
     */
    public transform<TModel>(value: AbstractControl<TModel>|null|undefined, _valueHash?: any): FormArray<AbstractControl<TModel>>|null
    {
        if(isBlank(value))
        {
            return null;
        }

        if(value instanceof FormArray)
        {
            return value as AsFormArray<TModel>;
        }

        this._logger?.warn('Failed to cast AbstractControl to FormArray');

        return null;
    }
}