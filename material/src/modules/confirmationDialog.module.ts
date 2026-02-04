import {NgModule} from '@angular/core';

import {ConfirmationDialogComponent} from '../components/confirmationDialog/confirmationDialog.component';
import {TitledDialogModule} from './titledDialog.module';
import {ConfirmationDialogDirective} from '../directives/confirmationDialog/confirmationDialog.directive';
import {ConfirmationDialogChoiceTemplateDirective} from '../directives/confirmationDialogChoiceTemplate/confirmationDialogChoiceTemplate.directive';

/**
 * Module containing confirmation dialog component and directive
 */
@NgModule(
{
    imports:
    [
        TitledDialogModule,
        ConfirmationDialogDirective,
        ConfirmationDialogChoiceTemplateDirective,
        ConfirmationDialogComponent,
    ],
    exports:
    [
        ConfirmationDialogDirective,
        ConfirmationDialogChoiceTemplateDirective,
    ]
})
export class ConfirmationDialogModule
{
}