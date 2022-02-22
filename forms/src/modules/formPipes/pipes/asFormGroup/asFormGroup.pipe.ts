import {Pipe} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {CastTypePipe} from '@anglr/common';

/**
 * Tries to convert `AbstractControl` to `FormGroup`
 */
@Pipe({name: 'asFormGroup'})
export class AsFormGroupPipe extends CastTypePipe<AbstractControl, FormGroup>
{
    //######################### protected fields #########################

    /**
     * @inheritdoc
     */
    protected override _isInstanceOfPredicate: (value: AbstractControl) => boolean = value => value instanceof FormGroup;
}