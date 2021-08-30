import {AsyncValidatorFn, ValidatorFn} from '@angular/forms';
import {Dictionary} from '@jscrpt/common';

/**
 * Factory function used for creaging ValidatorFn
 */
export interface ValidatorFnFactoryFn<TArg extends Dictionary<any> = any>
{
    /**
     * Function that creates ValidatorFn
     * @param args - Arguments passed for create function from owning class
     */
    (args: TArg): ValidatorFn;
}

/**
 * Factory function used for creaging AsyncValidatorFn
 */
export interface AsyncValidatorFnFactoryFn<TArg extends Dictionary<any> = any>
{
    /**
     * Function that creates AsyncValidatorFn
     * @param args - Arguments passed for create function from owning class
     */
    (args: TArg): AsyncValidatorFn;
}