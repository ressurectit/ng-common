import {NgModule} from '@angular/core';

import {GoBackDirective} from '../directives';

/**
 * Module for GoBack directive
 */
@NgModule(
{
    declarations:
    [
        GoBackDirective
    ],
    exports:
    [
        GoBackDirective
    ]
})
export class GoBackModule
{
}
