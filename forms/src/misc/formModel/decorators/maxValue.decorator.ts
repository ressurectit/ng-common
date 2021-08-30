import {Validators} from '../../validators';
import {ModelPropertyMetadata} from './modelPropertyMetadata.decorator';

/**
 * Sets maximal number value validation for property
 * @param maxValue - Maximal value that will be validated against
 */
export function MaxValue(maxValue: number): PropertyDecorator
{
    return ModelPropertyMetadata(
    {
        validators: [Validators.max(maxValue)]
    });
}