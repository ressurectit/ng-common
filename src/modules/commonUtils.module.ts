import {NgModule} from '@angular/core';

import {IsNaNPipe, IsPresentPipe, UrlEncodePipe, MergeCssClassesPipe, KeysPipe, TrimTextPipe} from '../pipes';

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
        MergeCssClassesPipe,
        KeysPipe,
        TrimTextPipe,
    ],
    exports: 
    [
        IsNaNPipe,
        IsPresentPipe,
        UrlEncodePipe,
        MergeCssClassesPipe,
        KeysPipe,
        TrimTextPipe,
    ]
})
export class CommonUtilsModule
{
}