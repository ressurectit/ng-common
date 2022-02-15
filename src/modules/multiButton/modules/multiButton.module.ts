import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MultiButtonComponent} from '../components/multiButton/multiButton.component';

/**
 * Module containing components for displaying multi button
 */
@NgModule(
{
    imports:
    [
        CommonModule
    ],
    declarations:
    [
        MultiButtonComponent
    ],
    exports:
    [
        MultiButtonComponent
    ]
})
export class MultiButtonModule
{
}