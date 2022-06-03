import {AsyncValidatorFn, ValidatorFn} from '@angular/forms';
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
     * @param _args - Static arguments/parameters that can be passed to validator
     */
    constructor(private _factoryFn?: ValidatorFnFactoryFn<TArg>,
                private _args?: TArg,)
    {
    }

    //######################### public methods #########################

    /**
     * Gets validator function factory function
     */
    public valueOf(): ValidatorFnFactoryFn<TArg>
    {
        if(this._args)
        {
            return (args: TArg): ValidatorFn =>
            {
                args = 
                {
                    ...this._args,
                    args
                };

                return this._factoryFn(args);
            };
        }

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
     * @param _args - Static arguments/parameters that can be passed to validator
     */
    constructor(private _factoryFn?: AsyncValidatorFnFactoryFn<TArg>,
                private _args?: TArg,)
    {
    }

    //######################### public methods #########################

    /**
     * Gets async validator function factory function
     */
    public valueOf(): AsyncValidatorFnFactoryFn<TArg>
    {
        if(this._args)
        {
            return (args: TArg): AsyncValidatorFn =>
            {
                args = 
                {
                    ...this._args,
                    args
                };

                return this._factoryFn(args);
            };
        }

        return this._factoryFn;
    }
}