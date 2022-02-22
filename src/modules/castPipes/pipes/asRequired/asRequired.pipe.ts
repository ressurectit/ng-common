import {Pipe, PipeTransform} from '@angular/core';

/**
 * Transforms type to required from nullable or undefined type
 */
@Pipe({name: 'asRequired'})
export class AsRequiredTypePipe<TType> implements PipeTransform
{
    /**
     * Transforms type to required from nullable or undefined type
     * @param value - Value to be transformed
     * @param defaultValue - Default value to be used if undefined or null
     * @param _valueHash - Parameter that can be used to change value, indicates that pipe input value has changed
     */
    public transform(value: TType|null|undefined, defaultValue: TType, _valueHash?: any): TType
    {
        return value ?? defaultValue;
    }
}