import {Directive, TemplateRef} from '@angular/core';

import {ConfirmationDialogChoiceTemplateContext} from './confirmationDialogChoiceTemplate.context';

/**
 * Directive used for obtaining custom confirmation dialog choice template
 */
@Directive(
{
    selector: '[confirmationDialogChoiceTemplate]',
})
export class ConfirmationDialogChoiceTemplateDirective
{
    //######################### constructor #########################
    constructor(public template: TemplateRef<ConfirmationDialogChoiceTemplateContext>)
    {
    }

    //######################### ng language server #########################

    /**
     * Allows typechecking for template
     */
    static ngTemplateContextGuard(_dir: ConfirmationDialogChoiceTemplateDirective, _ctx: unknown): _ctx is ConfirmationDialogChoiceTemplateContext
    {
        return true;
    }
}
