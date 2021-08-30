import {FormArray} from '@angular/forms';

import {ModelPropertyMetadata} from './modelPropertyMetadata.decorator';

/**
 * Defines property value as FormArray
 */
export function FormArrayProperty(): PropertyDecorator
{
    return ModelPropertyMetadata(
    {
        type: FormArray
    });
}