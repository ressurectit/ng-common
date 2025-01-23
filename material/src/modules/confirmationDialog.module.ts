import {NgModule} from '@angular/core';

import {ConfirmationDialogComponent} from '../components/confirmationDialog/confirmationDialog.component';
import {TitledDialogModule} from './titledDialog.module';
import {ConfirmationDialogDirective} from '../directives/confirmationDialog/confirmationDialog.directive';

/**
 * Module containing confirmation dialog component and directive
 */
@NgModule(
{
    imports:
    [
        TitledDialogModule,
        ConfirmationDialogDirective,
        ConfirmationDialogComponent,
    ],
    exports:
    [
        ConfirmationDialogDirective,
    ]
})
export class ConfirmationDialogModule
{
}