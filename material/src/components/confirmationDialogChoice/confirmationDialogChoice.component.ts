import {Component, ChangeDetectionStrategy, Optional, Inject} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {LocalizePipe} from '@anglr/common';

import {ConfirmationDialogOptions} from '../../misc/interfaces/confirmationDialog.interface';
import {CONFIRMATION_DIALOG_OPTIONS} from '../../misc/tokens';

/**
 * Confirmation dialog choice container component
 */
@Component(
{
    selector: 'confirmation-dialog-choice',
    templateUrl: 'confirmationDialogChoice.component.html',
    imports:
    [
        LocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogChoiceComponent
{
    //######################### protected properties - template bindings #########################

    /**
     * Options used for confirmation dialog component
     */
    protected options: ConfirmationDialogOptions;

    //######################### constructor #########################
    constructor(protected dialog: MatDialogRef<ConfirmationDialogOptions, boolean>,
                @Inject(CONFIRMATION_DIALOG_OPTIONS) @Optional() options: ConfirmationDialogOptions,)
    {
        this.options = options;
    }
}
