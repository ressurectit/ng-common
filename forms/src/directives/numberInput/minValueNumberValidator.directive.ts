import {NG_VALIDATORS, AbstractControl, Validator, ValidatorFn, ValidationErrors} from '@angular/forms';
import {forwardRef, Directive, Attribute, Input, ExistingProvider, OnChanges, SimpleChanges} from '@angular/core';
import {isBlank, isPresent} from '@jscrpt/common';

import {Validators} from '../../misc/validators';

/**
 * Validator that is injected with directive MinValueNumberValidatorDirective
 */
const MIN_NUMBER_VALIDATOR = <ExistingProvider>
{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MinValueNumberValidatorDirective),
    multi: true
};

/**
 * Directive injecting checking for number min value validator
 */
@Directive(
{
    selector: "input[number][minValue][formControlName],input[number][minValue][formControl],input[number][minValue][ngModel]",
    providers: [MIN_NUMBER_VALIDATOR]
})
export class MinValueNumberValidatorDirective implements Validator, OnChanges
{
    //######################### private fields #########################

    /**
     * Current min value that is allowed
     */
    private _minValue: number|null;

    /**
     * Function used for validations
     */
    private _validator: ValidatorFn;

    /**
     * Indication whether validator was initialized
     */
    private _initialized: boolean = false;

    //######################### public properties - inputs #########################
    /**
     * Bound min value that is allowed, which overrides value set to attribute minValue
     */
    @Input()
    public minValue?: number;

    //######################### constructor #########################
    constructor(@Attribute("minValue") minValue: string)
    {
        var value;

        if(isBlank(minValue) || minValue.length < 1 || isNaN(value = parseFloat(minValue.replace(",", "."))))
        {
            value = null;
        }

        this._minValue = value;
    }

    //######################### public methods - implementation of OnChanges #########################

    public ngOnChanges(changes: SimpleChanges): void
    {
        if(!this._initialized)
        {
            this._initialized = true;

            this._validator = Validators.min(this._minValue);
        }

        if ('minValue' in changes)
        {
            this._validator = Validators.min(isPresent(this.minValue) ? <number>this.minValue! : this._minValue);
        }
    }

    //######################### public methods - implementation of Validator #########################

    /**
     * Validates input and returns validation result
     * @param control - Control that is being validated
     * @returns validation results
     */
    public validate(control: AbstractControl): ValidationErrors|null
    {
        return this._validator(control);
    }
}