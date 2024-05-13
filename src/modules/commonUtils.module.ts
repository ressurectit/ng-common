import {NgModule} from '@angular/core';

import {IsNaNSAPipe, IsPresentSAPipe, UrlEncodeSAPipe, MergeCssClassesSAPipe, KeysSAPipe, TrimTextPipe} from '../pipes';

/**
 * Module for common utility stuff
 */
@NgModule(
{
    imports:
    [
        IsNaNSAPipe,
        IsPresentSAPipe,
        UrlEncodeSAPipe,
        MergeCssClassesSAPipe,
        KeysSAPipe,
        TrimTextPipe,
    ],
    exports: 
    [
        IsNaNSAPipe,
        IsPresentSAPipe,
        UrlEncodeSAPipe,
        MergeCssClassesSAPipe,
        KeysSAPipe,
        TrimTextPipe,
    ]
})
export class CommonUtilsModule
{
}