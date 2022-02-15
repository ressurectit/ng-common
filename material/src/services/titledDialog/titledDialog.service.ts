import {Injectable, TemplateRef} from "@angular/core";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ComponentType} from "@angular/cdk/portal";

import {TitledDialogConfig, ɵTitledDialogOptions} from "../../misc/interfaces/titledDialog.interface";
import {TitledDialogComponent} from "../../components/titledDialog/titledDialog.component";

/**
 * Titled dialog service used for displaying components in dialog
 */
@Injectable()
export class TitledDialogService
{
    //######################### constructor #########################
    constructor(private _dialog: MatDialog)
    {
    }

    //######################### public methods #########################

    /**
     * Opens a modal dialog containing the given component.
     * @param componentOrTemplateRef - Type of the component to load into the dialog, or a TemplateRef to instantiate as the dialog content.
     * @param config - Extra configuration options.
     * @returns Reference to the newly-opened dialog.
     */
    public open<T, D = any, R = any>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, config?: TitledDialogConfig<D>): MatDialogRef<T, R>
    {
        if(!config)
        {
            config = {};
        }

        config.data =
        <ɵTitledDialogOptions>
        {
            componentOrTemplateRef: componentOrTemplateRef,
            data: config.data,
            title: config.title
        } as any;

        return this._dialog.open(TitledDialogComponent, config) as MatDialogRef<any, R>;
    }
}