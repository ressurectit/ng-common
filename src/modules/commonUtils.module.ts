import {NgModule} from '@angular/core';

import {IsNaNSAPipe, IsPresentSAPipe, UrlEncodeSAPipe, MergeCssClassesSAPipe, KeysSAPipe} from '../pipes';

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
    ],
    exports: 
    [
        IsNaNSAPipe,
        IsPresentSAPipe,
        UrlEncodeSAPipe,
        MergeCssClassesSAPipe,
        KeysSAPipe,
    ]
})
export class CommonUtilsModule
{
}