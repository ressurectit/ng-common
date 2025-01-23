import {NgModule} from '@angular/core';

import {ProgressIndicatorComponent} from '../components/progressIndicator/progressIndicator.component';
import {ProgressOverlayDirective} from '../directives/progressOverlay/progressOverlay.directive';

/**
 * Module for progress indicator
 */
@NgModule(
{
    imports:
    [
        ProgressIndicatorComponent,
        ProgressOverlayDirective,
    ],
    exports:
    [
        ProgressIndicatorComponent,
        ProgressOverlayDirective,
    ]
})
export class ProgressIndicatorModule
{
}