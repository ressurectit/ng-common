import {Component, ChangeDetectionStrategy, Inject, Injector, ValueProvider, TemplateRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ComponentType} from '@angular/cdk/portal';

import {ɵTitledDialogOptions, TITLED_DIALOG_DATA} from '../../misc/interfaces/titledDialog.interface';

/**
 * Component used as wrapper for material dialog enhanced with title
 */
@Component(
{
    selector: 'titled-dialog',
    templateUrl: 'titledDialog.component.html',
    styleUrls: ['titledDialog.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitledDialogComponent
{
    //######################### public properties - template bindings #########################

    /**
     * Injector used for creating component or template
     */
    public injector: Injector;

    public get component(): ComponentType<any>
    {
        if(this.data?.componentOrTemplateRef instanceof TemplateRef)
        {
            return null;
        }

        return this.data.componentOrTemplateRef;
    }

    //######################### constructor #########################
    constructor(@Inject(MAT_DIALOG_DATA) public data: ɵTitledDialogOptions,
                public dialogRef: MatDialogRef<ɵTitledDialogOptions>,
                injector: Injector)
    {
        this.injector = Injector.create(
        [
            <ValueProvider>
            {
                provide: TITLED_DIALOG_DATA,
                useValue: data.data
            }
        ], injector);
    }
}