import {Directive, Input, EventEmitter, Output, HostListener} from '@angular/core';
import {lastValueFrom} from 'rxjs';

import {TitledDialogService} from '../../services/titledDialog/titledDialog.service';
import {ConfirmationDialogComponent} from '../../components/confirmationDialog/confirmationDialog.component';
import {ConfirmationDialogOptions, ConfirmationDialogCssClasses} from '../../misc/interfaces/confirmationDialog.interface';

/**
 * Directive that enables confirmation dialog on click
 */
@Directive(
{
    selector: '[confirmation]',
    standalone: true,
})
export class ConfirmationDialogDirective
{
    //######################### public properties - inputs #########################

    /**
     * Confirmation text that is displayed in dialog
     */
    @Input('confirmation')
    public confirmationText: string|undefined|null = undefined;

    /**
     * Title for confirmation dialog
     */
    @Input()
    public confirmationTitle: string = 'Confirmation';

    /**
     * Text for confirm confirmation button
     */
    @Input()
    public confirmationConfirm: string|undefined|null = undefined;

    /**
     * Text for cancel confirmation button
     */
    @Input()
    public confirmationCancel: string|undefined|null = undefined;

    /**
     * Object with css classes to be applied to confirmation dialog component
     */
    @Input()
    public confirmationCssClasses: ConfirmationDialogCssClasses|undefined|null = undefined;

    /**
     * Condidition that determines whether display confirmation dialog or skip it and run confirm directly
     */
    @Input()
    public skipConfirmation: boolean = false;

    /**
     * Indication whether prevent default and stop propagation of click event, defaults to true
     */
    @Input()
    public preventDefaultsAndPropagation: boolean = true;

    //######################### public properties - outputs #########################

    /**
     * Occurs when user confirms confirmation
     */
    @Output()
    public confirm: EventEmitter<void> = new EventEmitter<void>();

    //######################### constructor #########################
    constructor(private _dialog: TitledDialogService)
    {
    }

    //######################### public methods - host #########################

    /**
     * Method called when user clicks on element
     */
    @HostListener('click', ['$event'])
    public async click(event: MouseEvent): Promise<void>
    {
        if(this.preventDefaultsAndPropagation)
        {
            event.stopPropagation();
            event.preventDefault();
        }

        if(this.skipConfirmation)
        {
            this.confirm.emit();

            return;
        }

        const result = await lastValueFrom(this._dialog.open<ConfirmationDialogComponent, ConfirmationDialogOptions, boolean>(ConfirmationDialogComponent,
        {
            title: this.confirmationTitle,
            width: '33vw',
            data:
            {
                confirmationText: this.confirmationText || undefined,
                dialogCancelText: this.confirmationCancel ?? undefined,
                dialogConfirmText: this.confirmationConfirm ?? undefined,
                cssClasses: this.confirmationCssClasses ?? {},
            }
        }).afterClosed());

        if(result)
        {
            this.confirm.emit();
        }
    }
}