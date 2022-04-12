import {Component, ChangeDetectionStrategy} from '@angular/core';

import {TitledDialogComponent} from '../titledDialog/titledDialog.component';

/**
 * Component used as wrapper for material dialog enhanced with title, which is movable
 */
@Component(
{
    selector: 'movable-titled-dialog',
    templateUrl: 'movableTitledDialog.component.html',
    styleUrls: ['../titledDialog/titledDialog.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovableTitledDialogComponent extends TitledDialogComponent
{
}
