import {NgModule} from '@angular/core';
import {CommonModule as AngularCommonModule} from '@angular/common';

import {NgComponentOutletEx} from "../directives/ngComponentOutletEx/ngComponentOutletEx.directive";
import {IsNaNPipe} from '../pipes/isNaN/isNaN.pipe';
import {IsPresentPipe} from '../pipes/isPresent/isPresent.pipe';
import {UrlEncodePipe} from '../pipes/urlEncode/urlEncode.pipe';
import {LocalizePipe} from '../pipes/localize/localize.pipe';

/**
 * Module for common components, pipes and directives
 */
@NgModule(
{
    imports: 
    [
        AngularCommonModule
    ],
    declarations:
    [
        NgComponentOutletEx,
        IsNaNPipe,
        IsPresentPipe,
        LocalizePipe,
        UrlEncodePipe
    ],
    exports: 
    [
        NgComponentOutletEx,
        IsNaNPipe,
        IsPresentPipe,
        UrlEncodePipe,
        LocalizePipe
    ]
})
export class CommonModule
{
}