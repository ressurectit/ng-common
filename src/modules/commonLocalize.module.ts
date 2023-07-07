import {NgModule} from '@angular/core';

import {LocalizeSAPipe} from '../pipes/localize/localize.pipe';

/**
 * Module for common localization stuff
 */
@NgModule(
{
    imports:
    [
        LocalizeSAPipe,
    ],
    exports: 
    [
        LocalizeSAPipe,
    ],
})
export class CommonLocalizeModule
{
}