import {Directive, TemplateRef} from '@angular/core';

import {TooltipTemplateContext} from './tooltipTemplate.context';

/**
 * Directive used for obtaining custom tooltip template
 */
@Directive(
{
    selector: '[tooltipTemplate]'
})
export class TooltipTemplateDirective<TData = any>
{
    //######################### constructor #########################
    constructor(public template: TemplateRef<TooltipTemplateContext<TData>>)
    {
    }

    //######################### ng language server #########################
    
    /**
     * Allows typechecking for template
     */
    static ngTemplateContextGuard(_dir: TooltipTemplateDirective, _ctx: unknown): _ctx is TooltipTemplateContext
    {
        return true;
    }
}