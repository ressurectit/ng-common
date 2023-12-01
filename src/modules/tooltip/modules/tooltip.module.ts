import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TooltipDirective, TooltipTemplateDirective} from '../directives';
import {TooltipComponent} from '../components';

/**
 * Module for rendering tooltips
 */
@NgModule(
{
    imports:
    [
        CommonModule,
        TooltipDirective,
    ],
    declarations:
    [
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
