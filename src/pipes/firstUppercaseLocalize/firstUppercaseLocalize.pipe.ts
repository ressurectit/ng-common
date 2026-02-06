import {Pipe, PipeTransform} from '@angular/core';

import {LocalizePipe} from '../localize/localize.pipe';
import {FirstUppercasePipe} from '../firstUppercase/firstUppercase.pipe';
import {LocalizationString} from '../../types/classes';

/**
 * Localize strings using 'StringLocalization' and converts first letter of text to uppercase
 */
@Pipe(
{
    name: 'firstUppercaseLocalize',
    pure: false,
})
export class FirstUppercaseLocalizePipe implements PipeTransform
{
    //######################### protected fields #########################

    /**
     * Localize pipe used for localizing string
     */
    protected localizePipe: LocalizePipe = new LocalizePipe();

    /**
     * Pipe used for transforming first letter to uppercase
     */
    protected firstUppercasePipe: FirstUppercasePipe = new FirstUppercasePipe();

    //######################### public methods - PipeTransform #########################

    /**
     * Localize strings using 'StringLocalization' and converts first letter of text to uppercase
     * @param value - Value to be converted
     * @param interpolateParams - Optional object storing interpolation parameters
     */
    public transform(value: string|LocalizationString|undefined|null, interpolateParams?: Record<string, any>|null): string
    {
        return this.firstUppercasePipe.transform(this.localizePipe.transform(value, interpolateParams));
    }
}
