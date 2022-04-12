import {TemplateRef} from '@angular/core';
import {MatDialogConfig} from '@angular/material/dialog';
import {ComponentType} from '@angular/cdk/portal';

/**
 * Configuration for opening a titled modal dialog with the MatDialog service.
 */
export interface TitledDialogConfig<TData> extends MatDialogConfig<TData>
{
    /**
     * Title that is displayed in title of dialog
     */
    title?: string;
}

/**
 * Titled dialog options passed to titled dialog component
 */
export interface ɵTitledDialogOptions
{
    /**
     * Title that is displayed in title of dialog
     */
    title?: string;

    /**
     * Data passed to rendered component
     */
    data?: any;

    /**
     * Component or template to be rendered
     */
    componentOrTemplateRef?: ComponentType<any> | TemplateRef<any>;
}
