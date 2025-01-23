import {WritableSignal, signal} from '@angular/core';

/**
 * Creates backing field for this property as WritableSignal, reads and write to it
 */
export function AsSignal(): PropertyDecorator
{
    return function(target: object, propertyKey: string|symbol): void
    {
        const backingField = Symbol(propertyKey.toString());

        Object.defineProperty(target, propertyKey,
        {
            configurable: false,
            enumerable: true,
            get: function(this: {[key: symbol]: WritableSignal<unknown>})
            {
                return this[backingField]?.();
            },
            set: function(this: {[key: symbol]: WritableSignal<unknown>}, value: unknown)
            {
                if(!Object.getOwnPropertyDescriptor(this, backingField))
                {
                    Object.defineProperty(this, backingField,
                    {
                        configurable: false,
                        enumerable: false,
                        writable: true,
                        value: signal(undefined),
                    });
                }

                this[backingField].set(value);
            }
        });
    };
}