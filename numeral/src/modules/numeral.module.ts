import {NgModule} from '@angular/core';

import {NumeralSAPipe} from './../pipes/numeral.pipe';

/**
 * Module for components, pipes and directives that are using numeral library
 */
@NgModule(
{
    imports: [NumeralSAPipe],
    exports: [NumeralSAPipe]
})
export class NumeralModule
{
}