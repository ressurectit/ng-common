import {AsyncValidatorFn} from '@angular/forms';

import {AsyncValidatorFnFactory} from '../misc/validatorFactories';
import {ModelPropertyMetadata} from './modelPropertyMetadata.decorator';

/**
 * Sets async validator for property
 * @param validator - Instance of async validator or async validator factory
 */
export function AsyncValidator(validator: AsyncValidatorFn|AsyncValidatorFnFactory): PropertyDecorator
{
    return ModelPropertyMetadata(
    {
        asyncValidators: [validator]
    });
}