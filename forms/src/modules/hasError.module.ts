import {NgModule} from '@angular/core';

import {HasErrorDirective} from '../directives/hasError/hasError.directive';
import {GroupHasErrorDirective} from '../directives/groupHasError/groupHasError.directive';
import {GroupHasErrorContainerDirective, ValidationErrorsContainerDirective} from '../directives';

/**
 * Module for input validation directives
 */
@NgModule(
{
    imports:
    [
        HasErrorDirective,
        GroupHasErrorDirective,
        GroupHasErrorContainerDirective,
        ValidationErrorsContainerDirective,
    ],
    exports: 
    [
        HasErrorDirective,
        GroupHasErrorDirective,
        GroupHasErrorContainerDirective,
        ValidationErrorsContainerDirective,
    ]
})
export class HasErrorModule
{
}