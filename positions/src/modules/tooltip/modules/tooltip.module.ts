import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';

import {TooltipComponent} from '../components/tooltip/tooltip.component';
import {TooltipDirective} from '../directives/tooltip/tooltip.directive';

/**
 * Module for rendering tooltips
 */
@NgModule(
{
    imports:
    [
        CommonModule
    ],
    declarations:
    [
        TooltipDirective,
        TooltipComponent
    ],
    exports:
    [
        TooltipDirective
    ]
})
export class TooltipModule
{
}
