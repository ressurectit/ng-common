import {NgModule} from '@angular/core';

import {IsNaNPipe, IsPresentPipe, UrlEncodePipe, MergeCssClassesPipe, KeysPipe} from '../pipes';

/**
 * Module for common utility stuff
 */
@NgModule(
{
    declarations:
    [
        IsNaNPipe,
        IsPresentPipe,
        UrlEncodePipe,
        MergeCssClassesPipe,
        KeysPipe,
    ],
    exports: 
    [
        IsNaNPipe,
        IsPresentPipe,
        UrlEncodePipe,
        MergeCssClassesPipe,
        KeysPipe,
    ]
})
export class CommonUtilsModule
{
}