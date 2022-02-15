import {NgModule} from '@angular/core';

import {MaxValueNumberValidatorDirective} from '../directives/numberInput/maxValueNumberValidator.directive';
import {MinValueNumberValidatorDirective} from '../directives/numberInput/minValueNumberValidator.directive';
import {NumberInputControlValueAccessor} from '../directives/numberInput/numberInputControlValueAccessor.directive';
import {NumberInputValidatorDirective} from '../directives/numberInput/numberInputValidator.directive';

/**
 * Module for number input components, pipes and directives
 */
@NgModule(
{
    declarations: [MaxValueNumberValidatorDirective,
                   MinValueNumberValidatorDirective,
                   NumberInputControlValueAccessor,
                   NumberInputValidatorDirective],
    exports: [MaxValueNumberValidatorDirective,
              MinValueNumberValidatorDirective,
              NumberInputControlValueAccessor,
              NumberInputValidatorDirective]
})
export class NumberInputModule
{
}