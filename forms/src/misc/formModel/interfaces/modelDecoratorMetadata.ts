import {AsyncValidatorFn, ValidatorFn} from '@angular/forms';
import {Dictionary} from '@jscrpt/common';

import {AsyncValidatorFnFactory, ValidatorFnFactory} from '../misc/validatorFactories';
import {ModelPropertyDecoratorMetadata} from './modelPropertyDecoratorMetadata';

/**
 * Metadata describing whole model
 */
export interface ModelDecoratorMetadata<TModel = any, TArgs extends Dictionary<any> = any>
{
    /**
     * Array of controls metadata
     */
    ɵControlsMetadata: Partial<Record<keyof TModel, ModelPropertyDecoratorMetadata>>;

    /**
     * Array of validator functions
     */
    ɵValidators?: Array<ValidatorFn|ValidatorFnFactory>;

    /**
     * Array of async validator functions
     */
    ɵAsyncValidators?: Array<AsyncValidatorFn|AsyncValidatorFnFactory>;

    /**
     * Object storing additional arguments for customization
     */
    ɵArgs?: TArgs;
}
