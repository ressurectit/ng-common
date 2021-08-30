import {Validators} from '@angular/forms';

import {ModelPropertyMetadata} from './modelPropertyMetadata.decorator';

/**
 * Sets property pattern validation
 */
export function Pattern(pattern: string|RegExp): PropertyDecorator
{
    return ModelPropertyMetadata(
    {
        validators: [Validators.pattern(pattern)]
    });
}