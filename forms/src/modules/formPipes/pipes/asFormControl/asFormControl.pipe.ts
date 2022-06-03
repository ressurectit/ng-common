import {Inject, Optional, Pipe} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
import {Logger, LOGGER} from '@anglr/common';
import {isBlank} from '@jscrpt/common';

/**
 * Tries to convert `AbstractControl` to `FormControl`
 */
@Pipe({name: 'asFormControl'})
export class AsFormControlPipe
{
    //######################### constructors #########################
    constructor(@Optional() @Inject(LOGGER) private _logger?: Logger)
    {
    }

    //######################### public methods - implementation of PipeTransform #########################

    /**
     * Allows casting of `AbstractControl` to `FormControl`
     * @param value - `AbstractControl` to be cast to `FormControl`
     * @param _valueHash - Parameter that can be used to change value, indicates that pipe input value has changed
     */
    public transform<TModel>(value: AbstractControl<TModel>|null|undefined, _valueHash?: any): FormControl<TModel>|null
    {
        if(isBlank(value))
        {
            return null;
        }

        if(value instanceof FormControl)
        {
            return value as FormControl<TModel>;
        }

        this._logger?.warn('Failed to cast AbstractControl to FormControl');

        return null;
    }
}