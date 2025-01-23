import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';

import {TitledDialogService} from '../services/titledDialog/titledDialog.service';

/**
 * Module for components and service for displaying titled dialog
 */
@NgModule(
{
    imports:
    [
        MatDialogModule,
    ],
    providers:
    [
        TitledDialogService
    ]
})
export class TitledDialogModule
{
}