import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HasErrorDirective} from '../directives/hasError/hasError.directive';
import {GroupHasErrorDirective} from '../directives/groupHasError/groupHasError.directive';
import {DefaultValidationErrorsComponent, DefaultValidationErrorsContainerComponent} from '../components';

/**
 * Module for input validation directives
 */
@NgModule(
{
    imports:
    [
        CommonModule,
    ],
    declarations: 
    [
        HasErrorDirective,
        GroupHasErrorDirective,
        DefaultValidationErrorsComponent,
        DefaultValidationErrorsContainerComponent,
    ],
    exports: 
    [
        HasErrorDirective,
        GroupHasErrorDirective,
    ]
})
export class HasErrorModule
{
}