import {NgModule} from '@angular/core';

import {IsNaNPipe, IsPresentPipe, UrlEncodePipe, MergeCssClassesPipe} from '../pipes';

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
    ],
    exports: 
    [
        IsNaNPipe,
        IsPresentPipe,
        UrlEncodePipe,
        MergeCssClassesPipe,
    ]
})
export class CommonUtilsModule
{
}