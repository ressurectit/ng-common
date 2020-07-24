import {NgModule} from "@angular/core";

import {ClickOutsideDirective} from '../directives/clickOutside/clickOutside.directive';

/**
 * Module for ClickOutside directive
 */
@NgModule(
{
    imports:
    [
    ],
    declarations:
    [
        ClickOutsideDirective
    ],
    exports:
    [
        ClickOutsideDirective
    ]
})
export class ClickOutsideModule
{
}
