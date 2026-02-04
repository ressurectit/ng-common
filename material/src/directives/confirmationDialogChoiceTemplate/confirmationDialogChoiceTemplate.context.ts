import {MatDialogRef} from '@angular/material/dialog';

import {ConfirmationDialogOptions} from '../../misc/interfaces/confirmationDialog.interface';

/**
 * Context passed to template of confirmation dialog choice
 */
export interface ConfirmationDialogChoiceTemplateContext
{
    /**
     * Data that should be displayed in confirmation dialog choice template
     */
    $implicit: ConfirmationDialogOptions;

    /**
     * Reference to dialog instance
     */
    dialogRef: MatDialogRef<unknown, unknown>;
}
