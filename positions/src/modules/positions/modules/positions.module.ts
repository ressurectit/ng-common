import {NgModule} from '@angular/core';

import {PositionToDirective} from '../directives/positionTo/positionTo.directive';

/**
 * Module for position to directive
 */
@NgModule(
{
    imports:
    [
    ],
    declarations:
    [
        PositionToDirective
    ],
    exports:
    [
        PositionToDirective
    ]
})
export class PositionsModule
{
}
