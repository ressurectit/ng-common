import {Component, ChangeDetectionStrategy} from '@angular/core';
import {NgComponentOutlet} from '@angular/common';
import {CdkDrag, CdkDragHandle} from '@angular/cdk/drag-drop';
import {LocalizePipe} from '@anglr/common';

import {TitledDialogComponent} from '../titledDialog/titledDialog.component';

/**
 * Component used as wrapper for material dialog enhanced with title, which is movable
 */
@Component(
{
    selector: 'movable-titled-dialog',
    templateUrl: 'movableTitledDialog.component.html',
    styleUrl: '../titledDialog/titledDialog.component.css',
    imports:
    [
        CdkDrag,
        LocalizePipe,
        CdkDragHandle,
        NgComponentOutlet,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovableTitledDialogComponent extends TitledDialogComponent
{
}
