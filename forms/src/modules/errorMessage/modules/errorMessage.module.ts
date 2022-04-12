import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonUtilsModule} from '@anglr/common';

import {GroupErrorsComponent} from '../components';
import {ErrorMessageDirective, GroupErrorsTemplateDirective} from '../directives';
import {WithErrorMessagePipe} from '../pipes';

/**
 * Module for error message directives, pipes and components
 */
@NgModule(
{
    imports:
    [
        CommonModule,
        CommonUtilsModule,
    ],
    declarations:
    [
        WithErrorMessagePipe,
        ErrorMessageDirective,
        GroupErrorsTemplateDirective,
        GroupErrorsComponent,
    ],
    exports:
    [
        WithErrorMessagePipe,
        ErrorMessageDirective,
        GroupErrorsTemplateDirective,
        GroupErrorsComponent,
    ]
})
export class ErrorMessageModule
{
}
