import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommonLocalizeModule} from '../../commonLocalize';
import {ProgressIndicatorComponent} from '../components/progressIndicator/progressIndicator.component';
import {ProgressOverlayDirective} from '../directives/progressOverlay/progressOverlay.directive';

/**
 * Module for progress indicator
 */
@NgModule(
{
    imports:
    [
        CommonModule,
        CommonLocalizeModule,
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