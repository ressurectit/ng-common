import {Provider, Type} from '@angular/core';
import {nameof} from '@jscrpt/common';

/**
 * Type that contains provider
 */
interface ProviderDecoratedType
{
    /**
     * Provider that is attached to type
     */
    ɵɵprovider?: Provider;
}

/**
 * Gets provider from type
 * @param type - Type that should contain provider
 */
export function getProviderForType(type: Type<unknown>): Provider
{
    const typeWithProvider = type as ProviderDecoratedType;

    if(!typeWithProvider.ɵɵprovider)
    {
        throw new Error(`Type ${type} is without provider!`);
    }

    return typeWithProvider.ɵɵprovider;
}

/**
 * Attach provider to type
 * @param provider - Provider to be attached
 */
export function TypeProvider(provider: Provider): ClassDecorator
{
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function<TFunction extends Function> (target: TFunction): TFunction
    {
        const typeWithProvider = target as ProviderDecoratedType;
    
        if(!typeWithProvider.ɵɵprovider)
        {
            Object.defineProperty(typeWithProvider, nameof<ProviderDecoratedType>('ɵɵprovider'),
            {
                value: provider,
                writable: false,
                enumerable: false,
                configurable: false,
            });
        }

        return target;
    };
}