import {Pipe} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
import {CastTypePipe} from '@anglr/common';

/**
 * Tries to convert `AbstractControl` to `FormControl`
 */
@Pipe({name: 'asFormControl'})
export class AsFormControlPipe extends CastTypePipe<AbstractControl, FormControl>
{
    //######################### protected fields #########################

    /**
     * @inheritdoc
     */
    protected override _isInstanceOfPredicate: (value: AbstractControl) => boolean = value => value instanceof FormControl;
}