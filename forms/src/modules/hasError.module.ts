import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HasErrorDirective} from '../directives/hasError/hasError.directive';
import {GroupHasErrorDirective} from '../directives/groupHasError/groupHasError.directive';
import {GroupHasErrorContainerDirective, ValidationErrorsContainerDirective} from '../directives';
import {DefaultValidationErrorsComponent, DefaultValidationErrorsContainerComponent, ReservedSpaceValidationErrorsContainerComponent} from '../components';

/**
 * Module for input validation directives
 */
@NgModule(
{
    imports:
    [
        CommonModule,
        HasErrorDirective,
        GroupHasErrorDirective,
    ],
    declarations: 
    [
        GroupHasErrorContainerDirective,
        ValidationErrorsContainerDirective,
        DefaultValidationErrorsComponent,
        DefaultValidationErrorsContainerComponent,
        ReservedSpaceValidationErrorsContainerComponent,
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