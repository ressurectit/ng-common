import {Directive, TemplateRef} from '@angular/core';

import {GroupErrorsTemplateContext} from './groupErrorsTemplate.context';

/**
 * Obtains template for displaying form group error
 */
@Directive(
{
    selector: '[formGroupError]',
})
export class GroupErrorsTemplateDirective
{
    //######################### constructor #########################
    constructor(public template: TemplateRef<GroupErrorsTemplateContext>)
    {
    }

    //######################### ng language server #########################
    
    /**
     * Allows typechecking for template
     */
    static ngTemplateContextGuard(_dir: GroupErrorsTemplateDirective, _ctx: unknown): _ctx is GroupErrorsTemplateContext
    {
        return true;
    }
}