import {ModelPropertyMetadata} from './modelPropertyMetadata.decorator';

/**
 * Defines property default state as disabled
 */
export function Disabled(): PropertyDecorator
{
    return ModelPropertyMetadata(
    {
        disabled: true
    });
}