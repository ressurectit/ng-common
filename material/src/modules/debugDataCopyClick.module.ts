import {NgModule} from '@angular/core';
import {DebugDataModule} from '@anglr/common';

import {DebugDataCopyClickDirective} from '../directives/debugDataCopyClick/debugDataCopyClick.directive';

/**
 * Module for debug data copy click directive
 */
@NgModule(
{
    imports:
    [
    ],
    declarations:
    [
        DebugDataCopyClickDirective
    ],
    exports:
    [
        DebugDataCopyClickDirective,
        DebugDataModule,
    ]
})
export class DebugDataCopyClickModule
{
}
