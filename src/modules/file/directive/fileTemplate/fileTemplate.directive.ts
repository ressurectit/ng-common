import {Directive} from '@angular/core';

import {FileTemplateContext} from './fileTemplate.context';

/**
 * Directive used for obtaining file component visual template
 */
@Directive(
{
    selector: '[fileTemplate]',
})
export class FileTemplateDirective
{
    //######################### ng language server #########################

    /**
     * Allows typechecking for template
     */
    static ngTemplateContextGuard(_dir: FileTemplateDirective, _ctx: unknown): _ctx is FileTemplateContext
    {
        return true;
    }
}
