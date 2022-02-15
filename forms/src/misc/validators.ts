import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {isPresent} from "@jscrpt/common";

/**
 * Validations functions
 */
export class Validators
{
    /**
     * Validates control if its value is number
     * @param control - Control which value to be validated
     */
    public static number(control: AbstractControl): ValidationErrors|null
    {
        if(isNaN(control.value))
        {
            return {
                "number": true
            };
        }

        return null;
    }

    /**
     * Creates validator function that validates control if its value is higher than max value
     * @param max - Max value that should be validated
     */
    public static max(max: number|null): ValidatorFn
    {
        return (control: AbstractControl): ValidationErrors|null =>
        {
            if(!isNaN(control.value) && isPresent(control.value) && isPresent(max) && control.value > max!)
            {
                return {
                    "maxValue": max,
                    'actualValue': control.value
                };
            }

            return null;
        };
    }

    /**
     * Creates validator function that validates control if its value is lower than min value
     * @param min - Min value that should be validated
     */
    public static min(min: number|null): ValidatorFn
    {
        return (control: AbstractControl): ValidationErrors|null =>
        {
            if(!isNaN(control.value) && isPresent(control.value) && isPresent(min) && control.value < min!)
            {
                return {
                    "minValue": min,
                    'actualValue': control.value
                };
            }

            return null;
        };
    }
}