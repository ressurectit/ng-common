import {Validators} from '../../validators';
import {ModelPropertyMetadata} from './modelPropertyMetadata.decorator';

/**
 * Sets validation for number on property
 */
export function Number(): PropertyDecorator
{
    return ModelPropertyMetadata(
    {
        validators: [Validators.number]
    });
}