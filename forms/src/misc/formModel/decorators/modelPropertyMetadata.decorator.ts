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
    return function(target: Object, propertyKey: string|symbol): void
    {
        const trgt = target as ModelDecoratorMetadata<TModel>;

        if(!trgt.ɵControlsMetadata)
        {
            Object.defineProperty(trgt, nameof<ModelDecoratorMetadata>('ɵControlsMetadata'),
            {
                value: {},
                writable: false,
                enumerable: false,
                configurable: false
            });
        }

        //keep current validators
        const originValidators = trgt.ɵControlsMetadata[propertyKey as keyof TModel]?.validators ?? [];
        const originAsyncValidators = trgt.ɵControlsMetadata[propertyKey as keyof TModel]?.asyncValidators ?? [];

        //merge all other values
        trgt.ɵControlsMetadata[propertyKey as keyof TModel] = 
        {
            ...ɵDefaultPropertyMetadata,
            ...trgt.ɵControlsMetadata[propertyKey as keyof TModel],
            ...metadata
        };

        //merge validators
        const propertyMetadata = trgt.ɵControlsMetadata[propertyKey as keyof TModel];

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