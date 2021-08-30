import {Validators} from '@angular/forms';

import {getCurrentValue} from '../misc/currentValue';
import {ValidatorFnFactory} from '../misc/validatorFactories';
import {ModelPropertyMetadata} from './modelPropertyMetadata.decorator';

//TODO try to use infer for property TModel

/**
 * Sets property as required if condition is met (sets validator)
 * @param conditionProperty - Name of property that holds
 */
export function RequiredIf<TArgs = any>(conditionProperty: keyof TArgs): PropertyDecorator
{
    return ModelPropertyMetadata<any, TArgs>(
    {
        validators:
        [
            new ValidatorFnFactory(args =>
            {
                return control =>
                {
                    if(getCurrentValue(args[conditionProperty]))
                    {
                        return Validators.required(control);
                    }
    
                    return null;
                };
            })
        ]
    });
}