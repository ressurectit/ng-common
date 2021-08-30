import {ValidatorFn} from '@angular/forms';
import {nameof} from '@jscrpt/common';

import {ModelDecoratorMetadata} from '../interfaces/modelDecoratorMetadata';
import {ValidatorFnFactory} from '../misc/validatorFactories';

/**
 * Registers validator for whole FormGroup
 * @param validator - Instance of validator or validator factory
 */
export function FormGroupValidator(validator: ValidatorFn|ValidatorFnFactory): ClassDecorator
{
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function<TFunction extends Function> (target: TFunction): TFunction
    {
        const metadata: ModelDecoratorMetadata = target.prototype;
    
        if(!metadata.ɵValidators)
        {
            Object.defineProperty(target, nameof<ModelDecoratorMetadata>('ɵValidators'),
            {
                value: [],
                writable: false,
                enumerable: false,
                configurable: false
            });
        }

        metadata.ɵValidators.push(validator);

        return target;
    };
}