import {NgModule} from '@angular/core';

import {DebugDataComponent} from '../components/debugData/debugData.component';

/**
 * Module that contains debug data component
 */
@NgModule(
{
    imports:
    [
        DebugDataComponent,
    ],
    exports:
    [
        DebugDataComponent,
    ]
})
export class DebugDataModule
{
}