import {Validators} from '@angular/forms';

import {ModelPropertyMetadata} from './modelPropertyMetadata.decorator';

/**
 * Sets maximal length validation for property
 * @param maxLength - Maximal value that will be validated against
 */
export function MaxLength(maxLength: number): PropertyDecorator
{
    return ModelPropertyMetadata(
    {
        validators: [Validators.maxLength(maxLength)]
    });
}