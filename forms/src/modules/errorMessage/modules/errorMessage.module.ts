import {NgModule} from '@angular/core';

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
