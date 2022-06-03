import {Inject, Optional, Pipe} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {Logger, LOGGER} from '@anglr/common';
import {isBlank} from '@jscrpt/common';

import {AsFormGroup, FormModelGroup} from '../../../../misc/types';

/**
 * Tries to convert `AbstractControl` to `FormGroup`
 */
@Pipe({name: 'asFormGroup'})
export class AsFormGroupPipe
{
    //######################### constructors #########################
    constructor(@Optional() @Inject(LOGGER) private _logger?: Logger)
    {
    }

    //######################### public methods - implementation of PipeTransform #########################

    /**
     * Allows casting of `AbstractControl` to `FormGroup`
     * @param value - `AbstractControl` to be cast to `FormGroup`
     * @param _valueHash - Parameter that can be used to change value, indicates that pipe input value has changed
     */
    public transform<TModel>(value: AbstractControl<TModel>|null|undefined, _valueHash?: any): FormGroup<FormModelGroup<TModel>>|null
    {
        if(isBlank(value))
        {
            return null;
        }

        if(value instanceof FormGroup)
        {
            return value as AsFormGroup<TModel>;
        }

        this._logger?.warn('Failed to cast AbstractControl to FormGroup');

        return null;
    }
}
