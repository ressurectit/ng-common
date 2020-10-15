import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';

import {TooltipComponent} from '../components';
import {TooltipDirective} from '../directives';

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
