import {NgModule} from '@angular/core';

import {AsFormArrayPipe, AsFormControlPipe, AsFormGroupPipe, GetControlPipe} from '../pipes';

/**
 * Module that holds form util pipes
 */
@NgModule(
{
    declarations:
    [
        AsFormArrayPipe,
        AsFormControlPipe,
        AsFormGroupPipe,
        GetControlPipe,
    ],
    exports:
    [
        AsFormArrayPipe,
        AsFormControlPipe,
        AsFormGroupPipe,
        GetControlPipe,
    ]
})
export class FormPipesModule
{
}