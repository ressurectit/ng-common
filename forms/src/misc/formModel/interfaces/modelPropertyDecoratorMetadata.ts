import {AsyncValidatorFn, FormArray, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {Dictionary} from '@jscrpt/common';

import {AsyncValidatorFnFactory, ValidatorFnFactory} from '../misc/validatorFactories';

/**
 * Metadata describing model of single property
 */
export interface ModelPropertyDecoratorMetadata<TArgs extends Dictionary<any> = any>
{
    /**
     * Indication whether form control will be enabled for property
     */
    disabled?: boolean;

    /**
     * Type of control that represents this property
     */
    type?: typeof FormGroup|typeof FormArray|typeof FormControl;

    /**
     * Type of child, used only with combination of type FormArray
     */
    childType?: typeof FormGroup|typeof FormArray|typeof FormControl;

    /**
     * Array of validator functions
     */
    validators?: Array<ValidatorFn|ValidatorFnFactory>;

    /**
     * Array of async validator functions
     */
    asyncValidators?: Array<AsyncValidatorFn|AsyncValidatorFnFactory>;

    /**
     * Object storing additional arguments for customization
     */
    args?: TArgs;
}