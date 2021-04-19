import {Directive, Input, EventEmitter, Output, HostListener} from "@angular/core";

import {TitledDialogService} from "../../services/titledDialog/titledDialog.service";
import {ConfirmationDialogComponent} from "../../components/confirmationDialog/confirmationDialog.component";
import {ConfirmationDialogData} from "../../misc/interfaces/confirmationDialog.interface";

/**
 * Directive that enables confirmation dialog on click
 */
@Directive(
{
    selector: '[confirmation]'
})
export class ConfirmationDialogDirective
{
    //######################### public properties - inputs #########################

    /**
     * Confirmation text that is displayed in dialog
     */
    @Input('confirmation')
    public confirmationText: string = 'Do you wish to continue?';

    /**
     * Title for confirmation dialog
     */
    @Input()
    public confirmationTitle: string = 'Confirmation';

    /**
     * Text for confirm confirmation button
     */
    @Input()
    public confirmationConfirm: string;

    /**
     * Text for cancel confirmation button
     */
    @Input()
    public confirmationCancel: string;

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
    @HostListener('click')
    public async click()
    {
        let result = await this._dialog.open<ConfirmationDialogComponent, ConfirmationDialogData, boolean>(ConfirmationDialogComponent,
        {
            title: this.confirmationTitle,
            width: '26vw',
            data:
            {
                confirmationText: this.confirmationText,
                dialogCancelText: this.confirmationCancel,
                dialogConfirmText: this.confirmationConfirm
            }
        }).afterClosed().toPromise();

        if(result)
        {
            this.confirm.emit();
        }
    }
}