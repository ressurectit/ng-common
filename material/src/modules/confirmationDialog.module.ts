import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CommonModule as NgCommonModule} from '@anglr/common';

import {ConfirmationDialogComponent} from "../components/confirmationDialog/confirmationDialog.component";
import {TitledDialogModule} from "./titledDialog.module";
import {ConfirmationDialogDirective} from "../directives/confirmationDialog/confirmationDialog.directive";

/**
 * Module containing confirmation dialog component and directive
 */
@NgModule(
{
    imports:
    [
        CommonModule,
        NgCommonModule,
        TitledDialogModule
    ],
    declarations:
    [
        ConfirmationDialogComponent,
        ConfirmationDialogDirective
    ],
    exports:
    [
        ConfirmationDialogDirective
    ]
})
export class ConfirmationDialogModule
{
}