import {FormControl} from '@angular/forms';

import {ModelPropertyDecoratorMetadata} from '../interfaces/modelPropertyDecoratorMetadata';

/**
 * Default value for property metadata
 */
export const ɵDefaultPropertyMetadata: ModelPropertyDecoratorMetadata =
{
    asyncValidators: [],
    validators: [],
    disabled: false,
    type: FormControl,
    childType: FormControl,
    args: {}
};