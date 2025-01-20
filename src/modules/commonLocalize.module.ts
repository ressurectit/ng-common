import {NgModule} from '@angular/core';

import {LocalizePipe} from '../pipes/localize/localize.pipe';

/**
 * Module for common localization stuff
 */
@NgModule(
{
    imports:
    [
        LocalizePipe,
    ],
    exports: 
    [
        LocalizePipe,
    ],
})
export class CommonLocalizeModule
{
}