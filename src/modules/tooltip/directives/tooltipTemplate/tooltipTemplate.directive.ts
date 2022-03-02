import {Directive, TemplateRef} from '@angular/core';

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
    constructor(public template: TemplateRef<TData>)
    {
    }
}