import {Dictionary} from '@jscrpt/common';

import {AsyncValidatorFnFactoryFn, ValidatorFnFactoryFn} from '../interfaces/validator.interface';

/**
 * Class that represents ValidatorFn factory
 */
export class ValidatorFnFactory<TArg extends Dictionary<any> = any>
{
    //######################### constructor #########################
    /**
     * Creates instance of ValidatorFnFactory
     * @param _factoryFn - Function used for creating ValidatorFn
     */
    constructor(private _factoryFn?: ValidatorFnFactoryFn<TArg>)
    {
    }

    //######################### public methods #########################

    /**
     * Gets validator function factory function
     */
    public valueOf(): ValidatorFnFactoryFn<TArg>
    {
        return this._factoryFn;
    }
}

/**
 * Class that represents AsyncValidatorFn factory
 */
export class AsyncValidatorFnFactory<TArg extends Dictionary<any> = any>
{
    //######################### constructor #########################
    /**
     * Creates instance of AsyncValidatorFnFactory
     * @param _factoryFn - Function used for creating AsyncValidatorFn
     */
    constructor(private _factoryFn?: AsyncValidatorFnFactoryFn<TArg>)
    {
    }

    //######################### public methods #########################

    /**
     * Gets async validator function factory function
     */
    public valueOf(): AsyncValidatorFnFactoryFn<TArg>
    {
        return this._factoryFn;
    }
}