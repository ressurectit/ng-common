import {ModelPropertyOptions} from '../interfaces/modelPropertyDecoratorMetadata';

import {ModelPropertyMetadata} from './modelPropertyMetadata.decorator';

/**
 * Sets control options for property
 * @param options - Options for control that are set
 */
export function ControlOptions(options: ModelPropertyOptions): PropertyDecorator
{
    return ModelPropertyMetadata(
    {
        controlOptions: options
    });
}