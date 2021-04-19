import {InjectionToken} from '@angular/core';

import {ConfirmationDialogData} from './interfaces/confirmationDialog.interface';

/**
 * Injection token used for setting global default data for confirmation dialog
 */
export const CONFIRMATION_DIALOG_DATA: InjectionToken<ConfirmationDialogData> = new InjectionToken<ConfirmationDialogData>('CONFIRMATION_DIALOG_DATA');