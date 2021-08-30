import {Validators} from '@angular/forms';

import {ModelPropertyMetadata} from './modelPropertyMetadata.decorator';

/**
 * Sets email validation for property
 */
export function Email(): PropertyDecorator
{
    return ModelPropertyMetadata(
    {
        validators: [Validators.email]
    });
}