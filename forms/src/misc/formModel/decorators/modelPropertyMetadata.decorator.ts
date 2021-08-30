import {Dictionary, nameof} from '@jscrpt/common';

import {ModelDecoratorMetadata} from '../interfaces/modelDecoratorMetadata';
import {ModelPropertyDecoratorMetadata} from '../interfaces/modelPropertyDecoratorMetadata';
import {ɵDefaultPropertyMetadata} from '../misc/defaults';

/**
 * Defines metadata for model property
 * @param metadata - Metadata for model property, used for creating form
 */
export function ModelPropertyMetadata<TArgs extends Dictionary<any> = any,
                                      TModel = any>(metadata: ModelPropertyDecoratorMetadata<TArgs>): PropertyDecorator
{
    return function(target: ModelDecoratorMetadata<TModel>, propertyKey: string): void
    {
        if(!target.ɵControlsMetadata)
        {
            Object.defineProperty(target, nameof<ModelDecoratorMetadata>('ɵControlsMetadata'),
            {
                value: {},
                writable: false,
                enumerable: false,
                configurable: false
            });
        }

        //keep current validators
        const originValidators = target.ɵControlsMetadata[propertyKey as keyof TModel]?.validators ?? [];
        const originAsyncValidators = target.ɵControlsMetadata[propertyKey as keyof TModel]?.asyncValidators ?? [];

        //merge all other values
        target.ɵControlsMetadata[propertyKey] = 
        {
            ...target.ɵControlsMetadata[propertyKey],
            ...ɵDefaultPropertyMetadata,
            ...metadata
        };

        //merge validators
        const propertyMetadata = target.ɵControlsMetadata[propertyKey as keyof TModel];

        propertyMetadata.validators =
        [
            ...originValidators,
            ...propertyMetadata.validators,
        ];

        propertyMetadata.asyncValidators =
        [
            ...originAsyncValidators,
            ...propertyMetadata.asyncValidators,
        ];
    };
}