import {Pipe} from '@angular/core';
import {AbstractControl, FormArray} from '@angular/forms';
import {CastTypePipe} from '@anglr/common';

/**
 * Tries to convert `AbstractControl` to `FormArray`
 */
@Pipe({name: 'asFormArray'})
export class AsFormArrayPipe extends CastTypePipe<AbstractControl, FormArray>
{
    //######################### protected fields #########################

    /**
     * @inheritdoc
     */
    protected override _isInstanceOfPredicate: (value: AbstractControl) => boolean = value => value instanceof FormArray;
}