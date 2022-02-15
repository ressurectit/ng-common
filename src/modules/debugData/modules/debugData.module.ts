import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {DebugDataComponent} from "../components/debugData/debugData.component";

/**
 * Module that contains debug data component
 */
@NgModule(
{
    imports:
    [
        CommonModule
    ],
    declarations:
    [
        DebugDataComponent
    ],
    exports:
    [
        DebugDataComponent
    ]
})
export class DebugDataModule
{
}