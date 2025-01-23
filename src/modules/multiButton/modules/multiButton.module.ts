import {NgModule} from '@angular/core';

import {MultiButtonComponent} from '../components/multiButton/multiButton.component';

/**
 * Module containing components for displaying multi button
 */
@NgModule(
{
    imports:
    [
        MultiButtonComponent,
    ],
    exports:
    [
        MultiButtonComponent
    ]
})
export class MultiButtonModule
{
}