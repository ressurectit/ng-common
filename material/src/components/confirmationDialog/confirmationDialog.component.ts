import {Component, ChangeDetectionStrategy, Inject, Optional} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";
import {isBlank} from "@jscrpt/common";

import {CONFIRMATION_DIALOG_DATA} from '../../misc/tokens';
import {ConfirmationDialogData} from "../../misc/interfaces/confirmationDialog.interface";
import {TITLED_DIALOG_DATA} from '../../misc/interfaces/titledDialog.interface';

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
    //######################### constructor #########################
    constructor(@Inject(TITLED_DIALOG_DATA) public data: ConfirmationDialogData,
                public dialog: MatDialogRef<ConfirmationDialogData, boolean>,
                @Inject(CONFIRMATION_DIALOG_DATA) @Optional() globalData: ConfirmationDialogData)
    {
        //no value from data
        if(isBlank(data.dialogCancelText))
        {
            //no global value
            if(isBlank(globalData?.dialogCancelText))
            {
                data.dialogCancelText = "No";
            }
            else
            {
                data.dialogCancelText = globalData.dialogCancelText;
            }
        }
        
        //no value from data
        if(isBlank(data.dialogConfirmText))
        {
            //no global value
            if(isBlank(globalData?.dialogConfirmText))
            {
                data.dialogConfirmText = "Yes";
            }
            else
            {
                data.dialogConfirmText = globalData.dialogConfirmText;
            }
        }
    }
}