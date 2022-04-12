import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CommonDynamicModule, CommonLocalizeModule} from '@anglr/common';

import {MovableTitledDialogComponent} from '../components/movableTitledDialog/movableTitledDialog.component';

/**
 * Module for components for displaying movable titled dialog
 */
@NgModule(
{
    imports:
    [
        CommonDynamicModule,
        CommonLocalizeModule,
        MatDialogModule,
        DragDropModule,
    ],
    declarations:
    [
        MovableTitledDialogComponent
    ],
})
export class MovableTitledDialogModule
{
}
