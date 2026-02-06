import {Component, ChangeDetectionStrategy, Inject, Optional, Injector, ValueProvider} from '@angular/core';
import {NgComponentOutlet, NgTemplateOutlet} from '@angular/common';
import {MatDialogRef} from '@angular/material/dialog';
import {LocalizePipe} from '@anglr/common';
import {extend} from '@jscrpt/common/extend';

import {CONFIRMATION_DIALOG_OPTIONS, TITLED_DIALOG_DATA} from '../../misc/tokens';
import {ConfirmationDialogOptions} from '../../misc/interfaces/confirmationDialog.interface';
import {ConfirmationDialogChoiceComponent} from '../confirmationDialogChoice/confirmationDialogChoice.component';

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
        confirmButtonIcon: 'fa fa-check',
    },
    choiceComponent: ConfirmationDialogChoiceComponent,
};

/**
 * Confirmation dialog component
 */
@Component(
{
    selector: 'confirmation-dialog',
    templateUrl: 'confirmationDialog.component.html',
    imports:
    [
        NgTemplateOutlet,
        NgComponentOutlet,
        LocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent
{
    //######################### protected properties - template bindings #########################

    /**
     * Injector used for creating component or template
     */
    protected injector: Injector;

    /**
     * Options used for confirmation dialog component
     */
    protected options: ConfirmationDialogOptions;

    //######################### constructor #########################
    constructor(@Inject(TITLED_DIALOG_DATA) data: ConfirmationDialogOptions,
                protected dialog: MatDialogRef<ConfirmationDialogOptions, unknown>,
                @Inject(CONFIRMATION_DIALOG_OPTIONS) @Optional() options: ConfirmationDialogOptions,
                injector: Injector)
    {
        this.options = extend(true, {}, defaultOptions, options ?? {}, data);
        this.injector = Injector.create(
        {
            providers:
            [
                <ValueProvider>
                {
                    provide: CONFIRMATION_DIALOG_OPTIONS,
                    useValue: this.options,
                },
            ],
            parent: injector,
        });

        if(!this.options.choiceComponent && !this.options.template)
        {
            throw new Error('Confirmation dialog requires either choice component or template to be provided!');
        }
    }
}
