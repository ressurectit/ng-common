import {WritableSignal, signal, untracked} from '@angular/core';

/**
 * Creates backing field for this property as WritableSignal, reads and write to it
 * @param transform - Optional transform function
 */
export function AsSignal<TThis = unknown, TValue = unknown>(transform?: (this: TThis, oldValue: TValue, newValue: TValue) => TValue): PropertyDecorator
{
    return function(target: object, propertyKey: string|symbol): void
    {
        const backingField = Symbol(propertyKey.toString());

        const ensureSignal = ($this: object) =>
        {
            if(!Object.hasOwn($this, backingField))
            {
                Object.defineProperty($this, backingField,
                {
                    configurable: false,
                    enumerable: false,
                    writable: false,
                    value: signal(undefined),
                });
            }
        };

        Object.defineProperty(target, propertyKey,
        {
            configurable: false,
            enumerable: true,
            get: function(this: {[key: symbol]: WritableSignal<TValue>})
            {
                ensureSignal(this);

                return this[backingField]();
            },
            set: function(this: {[key: symbol]: WritableSignal<TValue>}, value: TValue)
            {
                ensureSignal(this);

                this[backingField].set(transform ? transform.call(this as TThis, untracked(() => this[backingField]()), value) : value);
            }
        });
    };
}
