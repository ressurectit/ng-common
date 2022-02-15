import {NG_VALIDATORS, AbstractControl, Validator, ValidatorFn, ValidationErrors} from '@angular/forms';
import {ExistingProvider, Input, forwardRef, Directive, Attribute, OnChanges, SimpleChanges} from '@angular/core';
import {isBlank, isPresent} from '@jscrpt/common';

import {Validators} from '../../misc/validators';

/**
 * Validator that is injected with directive MaxValueNumberValidatorDirective
 */
const MAX_NUMBER_VALIDATOR = <ExistingProvider>
{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MaxValueNumberValidatorDirective),
    multi: true
};

/**
 * Directive injecting checking for number max value validator
 */
@Directive(
{
    selector: "input[number][maxValue][formControlName],input[number][maxValue][formControl],input[number][maxValue][ngModel]",
    providers: [MAX_NUMBER_VALIDATOR]
})
export class MaxValueNumberValidatorDirective implements Validator, OnChanges
{
    //######################### private fields #########################

    /**
     * Current max value that is allowed
     */
    private _maxValue: number|null;

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
     * Bound max value that is allowed, which overrides value set to attribute maxValue
     */
    @Input()
    public maxValue?: number;

    //######################### constructor #########################
    constructor(@Attribute("maxValue") maxValue: string)
    {
        var value;

        if(isBlank(maxValue) || maxValue.length < 1 || isNaN(value = parseFloat(maxValue.replace(",", "."))))
        {
            value = null;
        }

        this._maxValue = value;
    }

    //######################### public methods - implementation of OnChanges #########################

    public ngOnChanges(changes: SimpleChanges): void
    {
        if(!this._initialized)
        {
            this._initialized = true;

            this._validator = Validators.max(this._maxValue);
        }

        if ('maxValue' in changes)
        {
            this._validator = Validators.max(isPresent(this.maxValue) ? <number>this.maxValue! : this._maxValue);
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