import {AsyncValidatorFn} from '@angular/forms';
import {nameof} from '@jscrpt/common';

import {ModelDecoratorMetadata} from '../interfaces/modelDecoratorMetadata';
import {AsyncValidatorFnFactory} from '../misc/validatorFactories';

/**
 * Registers async validator for whole FormGroup
 * @param validator - Instance of async validator or async validator factory
 */
export function FormGroupAsyncValidator(validator: AsyncValidatorFn|AsyncValidatorFnFactory): ClassDecorator
{
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function<TFunction extends Function> (target: TFunction): TFunction
    {
        const metadata: ModelDecoratorMetadata = target.prototype;
    
        if(!metadata.ɵAsyncValidators)
        {
            Object.defineProperty(metadata, nameof<ModelDecoratorMetadata>('ɵAsyncValidators'),
            {
                value: [],
                writable: false,
                enumerable: false,
                configurable: false
            });
        }

        metadata.ɵAsyncValidators.push(validator);

        return target;
    };
}