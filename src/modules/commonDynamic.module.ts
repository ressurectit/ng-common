import {NgModule} from '@angular/core';

import {NgComponentOutletEx} from '../directives/ngComponentOutletEx/ngComponentOutletEx.directive';

/**
 * Module for common dynamic stuff
 */
@NgModule(
{
    declarations:
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