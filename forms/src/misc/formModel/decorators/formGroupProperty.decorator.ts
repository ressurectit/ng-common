import {FormGroup} from '@angular/forms';

import {ModelPropertyMetadata} from './modelPropertyMetadata.decorator';

/**
 * Defines property value as FormGroup
 */
export function FormGroupProperty(): PropertyDecorator
{
    return ModelPropertyMetadata(
    {
        type: FormGroup
    });
}