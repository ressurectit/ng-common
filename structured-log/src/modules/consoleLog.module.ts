import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ConsoleComponent} from '../components/console/console.component';

/**
 * Module containing component Console (log)
 */
@NgModule(
{
    imports:
    [
        CommonModule
    ],
    declarations:
    [
        ConsoleComponent
    ],
    exports:
    [
        ConsoleComponent
    ]
})
export class ConsoleLogModule
{
}