import {NgModule} from '@angular/core';

import {TooltipDirective, TooltipTemplateDirective} from '../directives';
import {TooltipComponent} from '../components';

/**
 * Module for rendering tooltips
 */
@NgModule(
{
    imports:
    [
        TooltipDirective,
        TooltipTemplateDirective,
        TooltipComponent,
    ],
    exports:
    [
        TooltipDirective,
        TooltipTemplateDirective,
    ]
})
export class TooltipModule
{
}
