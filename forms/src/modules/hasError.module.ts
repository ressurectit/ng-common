import {NgModule} from '@angular/core';

import {HasErrorDirective} from '../directives/hasError/hasError.directive';
import {GroupHasErrorDirective} from '../directives/groupHasError/groupHasError.directive';

/**
 * Module for input validation directives
 */
@NgModule(
{
    declarations: [HasErrorDirective,
                   GroupHasErrorDirective],
    exports: [HasErrorDirective,
              GroupHasErrorDirective]
})
export class HasErrorModule
{
}