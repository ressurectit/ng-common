import {Directive, Input, EventEmitter, Output, HostListener, TemplateRef, ContentChild} from '@angular/core';
import {lastValueFrom} from 'rxjs';

import {ConfirmationDialogComponent} from '../../components/confirmationDialog/confirmationDialog.component';
import {ConfirmationDialogOptions, ConfirmationDialogCssClasses} from '../../misc/interfaces/confirmationDialog.interface';
import {ConfirmationDialogChoiceTemplateContext} from '../confirmationDialogChoiceTemplate/confirmationDialogChoiceTemplate.context';
import {ConfirmationDialogChoiceTemplateDirective} from '../confirmationDialogChoiceTemplate/confirmationDialogChoiceTemplate.directive';
import {TitledDialogConfig} from '../../misc/interfaces/titledDialog.interface';
import {TitledDialogService} from '../../services/titledDialog/titledDialog.service';

/**
 * Directive that enables confirmation dialog on click
 */
@Directive(
{
    selector: '[confirmation]',
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
     * Custom options for confirmation dialog
     */
    @Input()
    public confirmationDialogOptions: Partial<TitledDialogConfig<ConfirmationDialogOptions>>|undefined|null = undefined;

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

    /**
     * Instance of confirmation dialog template that is used for rendering button container
     */
    @Input('choiceTemplate')
    public confirmationDialogChoiceTemplate?: TemplateRef<ConfirmationDialogChoiceTemplateContext>;

    //######################### public properties - outputs #########################

    /**
     * Occurs when user confirms confirmation
     */
    @Output()
    public confirm: EventEmitter<void> = new EventEmitter<void>();

    //######################### protected properties - children #########################

    /**
     * Instance of template from element content, used for rendering
     */
    @ContentChild(ConfirmationDialogChoiceTemplateDirective)
    protected confirmationDialogChoiceTemplateChild?: ConfirmationDialogChoiceTemplateDirective;

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
            ...this.confirmationDialogOptions,
            data:
            {
                confirmationText: this.confirmationText || undefined,
                dialogCancelText: this.confirmationCancel ?? undefined,
                dialogConfirmText: this.confirmationConfirm ?? undefined,
                cssClasses: this.confirmationCssClasses ?? {},
                template: this.confirmationDialogChoiceTemplate ?? this.confirmationDialogChoiceTemplateChild?.template,
            },
        }).afterClosed());

        if(result)
        {
            this.confirm.emit();
        }
    }
}
