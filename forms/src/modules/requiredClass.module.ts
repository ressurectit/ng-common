import {NgModule} from '@angular/core';

import {RequiredClassDirective} from '../directives/requiredClass/requiredClass.directive';

/**
 * Module for required class directive
 */
@NgModule(
{
    declarations: [RequiredClassDirective],
    exports: [RequiredClassDirective]
})
export class RequiredClassModule
{
}