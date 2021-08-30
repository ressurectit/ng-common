import {Validators} from '../../validators';
import {ModelPropertyMetadata} from './modelPropertyMetadata.decorator';

/**
 * Sets min numeral value validation for property
 * @param value - Minimal value that will be validated against
 */
export function MinValue(value: number): PropertyDecorator
{
    return ModelPropertyMetadata(
    {
        validators: [Validators.min(value)]
    });
}