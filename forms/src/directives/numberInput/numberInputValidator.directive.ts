import {NG_VALIDATORS, AbstractControl, Validator, ValidationErrors} from '@angular/forms';
import {ExistingProvider, forwardRef, Directive} from '@angular/core';

import {Validators} from '../../misc/validators';

/**
 * Validator that is injected with directive NumberInputValidatorDirective
 */
const NUMBER_VALIDATOR = <ExistingProvider>
{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => NumberInputValidatorDirective),
    multi: true
};

/**
 * Is number directive injecting checking for number validator
 */
@Directive(
{
    selector: "input[number][formControlName],input[number][formControl],input[number][ngModel]",
    providers: [NUMBER_VALIDATOR]
})
export class NumberInputValidatorDirective implements Validator
{
    //######################### public methods - implementation of Validator #########################

    /**
     * Validates input and returns validation result
     * @param control - Control that is being validated
     * @returns validation results
     */
    public validate(control: AbstractControl): ValidationErrors|null
    {
        return Validators.number(control);
    }
}