import {InjectionToken} from '@angular/core';

import {ConfirmationDialogOptions} from './interfaces/confirmationDialog.interface';

/**
 * Injection token used for setting global default options for confirmation dialog
 */
export const CONFIRMATION_DIALOG_OPTIONS: InjectionToken<ConfirmationDialogOptions> = new InjectionToken<ConfirmationDialogOptions>('CONFIRMATION_DIALOG_OPTIONS');
