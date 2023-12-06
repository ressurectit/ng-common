import {InjectionToken} from '@angular/core';
import {RecursivePartial} from '@jscrpt/common';

import {ConfirmationDialogOptions} from './interfaces/confirmationDialog.interface';

/**
 * Injection token used for setting global default options for confirmation dialog
 */
export const CONFIRMATION_DIALOG_OPTIONS: InjectionToken<RecursivePartial<ConfirmationDialogOptions>> = new InjectionToken<RecursivePartial<ConfirmationDialogOptions>>('CONFIRMATION_DIALOG_OPTIONS');

/** 
 * Injection token that can be used to access the data that was passed in to a titled dialog. 
 */
export const TITLED_DIALOG_DATA: InjectionToken<any> = new InjectionToken<any>('TITLED_DIALOG_DATA');
