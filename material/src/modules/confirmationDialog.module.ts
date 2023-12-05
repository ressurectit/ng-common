import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonLocalizeModule} from '@anglr/common';

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
        CommonModule,
        CommonLocalizeModule,
        TitledDialogModule,
        ConfirmationDialogDirective,
    ],
    declarations:
    [
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