import {FormGroup} from '@angular/forms';
import {isBlank} from '@jscrpt/common';

import {Validator} from './validator.decorator';

/**
 * Invalidates `FormControl` when current `FormControl` values changes
 * @param property - Name of `TModel` control or array of these properties to be invalidated on change
 * @param opts - Configuration options determine how the control propagates changes and emits events on sibling controls
 * after updates and validity checks are applied.
 * * `onlySelf`: When true, only update this control. When false or not supplied,
 * update all direct ancestors. Default is false.
 * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
 * `valueChanges`
 * observables emit events with the latest status and value when the control is updated.
 * When false, no events are emitted.
 * * `markAsTouched` calls also `markAsTouched` on sibling control
 * * `markAsDirty` calls also `markAsDirty` on sibling control
 */
export function InvalidateOnChange<TModel = any>(property: Extract<keyof TModel, string>|Extract<keyof TModel, string>[],
                                                 opts?: {onlySelf?: boolean, emitEvent?: boolean, markAsTouched?: boolean, markAsDirty?: boolean}): PropertyDecorator
{
    const emitEvent: boolean = isBlank(opts?.emitEvent) || opts?.emitEvent === true;
    const onlySelf: boolean = opts?.onlySelf ?? false;

    return Validator(control =>
    {
        if(!Array.isArray(property))
        {
            property = [property];
        }
        
        const parent = control.parent;

        if(parent instanceof FormGroup)
        {
            property.forEach(prop =>
            {
                parent.get(prop)?.updateValueAndValidity({emitEvent, onlySelf});

                if(opts?.markAsDirty)
                {
                    parent.get(prop)?.markAsDirty({onlySelf});
                }

                if(opts?.markAsTouched)
                {
                    parent.get(prop)?.markAsTouched({onlySelf});
                }
            });
        }

        return null;
    });
}