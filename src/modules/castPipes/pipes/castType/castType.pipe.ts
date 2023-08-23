import {Inject, Optional, Pipe, PipeTransform} from '@angular/core';
import {isBlank} from '@jscrpt/common';

import {LOGGER} from '../../../../types/tokens';
import {Logger} from '../../../logger';

/**
 * Allows casting of type for templates, should be used inherited
 */
@Pipe({name: 'castType'})
export class CastTypePipe<TSource, TTarget extends TSource> implements PipeTransform
{
    //######################### protected fields #########################

    /**
     * Predicate for testing whether is value instance of something
     */
    protected _isInstanceOfPredicate: (value: TSource) => boolean = () => true;

    //######################### constructors #########################
    constructor(@Optional() @Inject(LOGGER) private _logger?: Logger)
    {
    }

    //######################### public methods - implementation of PipeTransform #########################

    /**
     * Allows casting of type for templates, should be used inherited
     * @param value - Value to be cast to another type
     * @param _valueHash - Parameter that can be used to change value, indicates that pipe input value has changed
     */
    public transform(value: TSource, _valueHash?: any): TTarget
    {
        if(isBlank(value))
        {
            return null;
        }

        if(this._isInstanceOf(value))
        {
            return value;
        }

        this._logger?.warn('Failed to cast value to target');

        return null;
    }

    //######################### protected methods #########################

    /**
     * Checks whether is value instance of TTarget
     * @param value - Value to be checked whether is instance of TTarget
     */
    protected _isInstanceOf(value: TSource): value is TTarget
    {
        return this._isInstanceOfPredicate(value);
    }
}