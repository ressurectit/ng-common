import {EnvironmentProviders, ValueProvider, makeEnvironmentProviders} from '@angular/core';
import {RecursivePartial} from '@jscrpt/common';

import {ConfirmationDialogOptions} from './interfaces/confirmationDialog.interface';
import {CONFIRMATION_DIALOG_OPTIONS} from './tokens';

/**
 * Provides global options for confirmation dialog
 * @param options - Confirmation dialog options to be provided
 */
export function provideConfirmationDialogOptions(options: RecursivePartial<ConfirmationDialogOptions>): EnvironmentProviders
{
    return makeEnvironmentProviders(
    [
        <ValueProvider>
        {
            provide: CONFIRMATION_DIALOG_OPTIONS,
            useValue: options,
        }
    ]);
}