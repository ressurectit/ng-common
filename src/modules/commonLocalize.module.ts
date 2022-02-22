import {NgModule} from '@angular/core';

import {LocalizePipe} from '../pipes/localize/localize.pipe';

/**
 * Module for common localization stuff
 */
@NgModule(
{
    declarations:
    [
        LocalizePipe,
    ],
    exports: 
    [
        LocalizePipe,
    ]
})
export class CommonLocalizeModule
{
}