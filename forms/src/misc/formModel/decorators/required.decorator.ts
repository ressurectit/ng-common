import {Validators} from '@angular/forms';

import {ModelPropertyMetadata} from './modelPropertyMetadata.decorator';

/**
 * Sets property as required (sets validator)
 */
export function Required(): PropertyDecorator
{
    return ModelPropertyMetadata(
    {
        validators: [Validators.required]
    });
}