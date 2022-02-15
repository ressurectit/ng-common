import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {CommonLocalizeModule} from '@anglr/common';

import {TitledDialogComponent} from '../components/titledDialog/titledDialog.component';
import {TitledDialogService} from '../services/titledDialog/titledDialog.service';

/**
 * Module for components and service for displaying titled dialog
 */
@NgModule(
{
    imports:
    [
        CommonLocalizeModule,
        MatDialogModule
    ],
    declarations:
    [
        TitledDialogComponent
    ],
    providers:
    [
        TitledDialogService
    ]
})
export class TitledDialogModule
{
}