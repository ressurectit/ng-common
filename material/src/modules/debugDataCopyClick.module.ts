import {NgModule} from '@angular/core';
import {DebugDataComponent} from '@anglr/common';

import {DebugDataCopyClickDirective} from '../directives/debugDataCopyClick/debugDataCopyClick.directive';

/**
 * Module for debug data copy click directive
 */
@NgModule(
{
    imports:
    [
        DebugDataComponent,
        DebugDataCopyClickDirective,
    ],
    exports:
    [
        DebugDataCopyClickDirective,
        DebugDataComponent,
    ]
})
export class DebugDataCopyClickModule
{
}
