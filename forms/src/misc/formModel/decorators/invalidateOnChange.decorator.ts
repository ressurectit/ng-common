import {FormGroup} from '@angular/forms';

import {Validator} from './validator.decorator';

/**
 * Invalidates `FormControl` when current `FormControl` values changes
 * @param property - Name or array of `FormControl` names that will be invalidated
 */
export function InvalidateOnChange<TModel = any>(property: Extract<keyof TModel, string>|Extract<keyof TModel, string>[]): PropertyDecorator
{
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
                parent.get(prop)?.updateValueAndValidity();
            });
        }

        return null;
    });
}