import {ValidatorFn} from '@angular/forms';

import {ValidatorFnFactory} from '../misc/validatorFactories';
import {ModelPropertyMetadata} from './modelPropertyMetadata.decorator';

/**
 * Sets validator for property
 * @param validator - Instance of validator or validator factory
 */
export function Validator(validator: ValidatorFn|ValidatorFnFactory): PropertyDecorator
{
    return ModelPropertyMetadata(
    {
        validators: [validator]
    });
}