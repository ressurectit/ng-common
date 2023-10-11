import {NgModule} from '@angular/core';

import {NgComponentOutletEx} from '../directives/ngComponentOutletEx/ngComponentOutletEx.directive';

/**
 * Module for common dynamic stuff
 */
@NgModule(
{
    imports:
    [
        NgComponentOutletEx,
    ],
    exports: 
    [
        NgComponentOutletEx,
    ]
})
export class CommonDynamicModule
{
}