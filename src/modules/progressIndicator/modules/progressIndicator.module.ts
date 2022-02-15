import {NgModule} from '@angular/core';
import {CommonModule as AngularCommonModule} from '@angular/common';

import {CommonModule} from '../../common.module';
import {ProgressIndicatorComponent} from '../components/progressIndicator/progressIndicator.component';
import {ProgressOverlayDirective} from '../directives/progressOverlay/progressOverlay.directive';

/**
 * Module for progress indicator
 */
@NgModule(
{
    imports:
    [
        AngularCommonModule,
        CommonModule
    ],
    declarations:
    [
        ProgressIndicatorComponent,
        ProgressOverlayDirective
    ],
    exports:
    [
        ProgressIndicatorComponent,
        ProgressOverlayDirective
    ]
})
export class ProgressIndicatorModule
{
}