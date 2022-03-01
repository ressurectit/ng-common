import {FormArray, FormControl, FormGroup} from '@angular/forms';

import {ModelPropertyMetadata} from './modelPropertyMetadata.decorator';

/**
 * Defines child type for FormArray
 * @param childType - Type of child that should be created inside FormArray
 */
export function FormArrayChild(childType: typeof FormGroup|typeof FormArray|typeof FormControl): PropertyDecorator
{
    return ModelPropertyMetadata(
    {
        childType: childType
    });
}