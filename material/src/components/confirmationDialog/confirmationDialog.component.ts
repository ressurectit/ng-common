import {Component, ChangeDetectionStrategy, Inject, Optional} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {extend} from '@jscrpt/common/extend';

import {CONFIRMATION_DIALOG_OPTIONS} from '../../misc/tokens';
import {TITLED_DIALOG_DATA} from '../../misc/tokens';
import {ConfirmationDialogOptions} from '../../misc/interfaces/confirmationDialog.interface';

/**
 * Default options for dialog
 * @internal
 */
const defaultOptions: ConfirmationDialogOptions =
{
    confirmationText: 'Do you wish to continue?',
    dialogCancelText: 'No',
    dialogConfirmText: 'Yes',
    cssClasses:
    {
        buttonsContainerDiv: 'flex-row flex-end margin-top-big',
        closeButton: 'btn btn-danger margin-right-extra-small',
        closeButtonIcon: 'fa fa-ban',
        confirmButton: 'btn btn-primary',
        confirmButtonIcon: 'fa fa-check'
    }
};

/**
 * Confirmation dialog component
 */
@Component(
{
    selector: 'confirmation-dialog',
    templateUrl: 'confirmationDialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationDialogComponent
{
    //######################### public properties - template bindings #########################

    /**
     * Options used for confirmation dialog component
     * @internal
     */
    public options: ConfirmationDialogOptions;

    //######################### constructor #########################
    constructor(@Inject(TITLED_DIALOG_DATA) data: ConfirmationDialogOptions,
                public dialog: MatDialogRef<ConfirmationDialogOptions, boolean>,
                @Inject(CONFIRMATION_DIALOG_OPTIONS) @Optional() options: ConfirmationDialogOptions)
    {
        this.options = extend(true, {}, defaultOptions, options ?? {}, data);
    }
}
