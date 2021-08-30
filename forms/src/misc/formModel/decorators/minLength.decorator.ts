import {Validators} from '@angular/forms';

import {ModelPropertyMetadata} from './modelPropertyMetadata.decorator';

/**
 * Sets minimal length validation on property
 * @param minLength - Minimal length that will be validated against
 */
export function MinLength(minLength: number): PropertyDecorator
{
    return ModelPropertyMetadata(
    {
        validators: [Validators.minLength(minLength)]
    });
}