import {NgModule} from '@angular/core';

import {IsNaNPipe, IsPresentPipe, UrlEncodePipe, MergeCssClassesSAPipe, KeysPipe, TrimTextPipe} from '../pipes';

/**
 * Module for common utility stuff
 */
@NgModule(
{
    imports:
    [
        IsNaNPipe,
        IsPresentPipe,
        UrlEncodePipe,
        MergeCssClassesSAPipe,
        KeysPipe,
        TrimTextPipe,
    ],
    exports: 
    [
        IsNaNPipe,
        IsPresentPipe,
        UrlEncodePipe,
        MergeCssClassesSAPipe,
        KeysPipe,
        TrimTextPipe,
    ]
})
export class CommonUtilsModule
{
}