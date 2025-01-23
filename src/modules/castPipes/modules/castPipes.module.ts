import {NgModule} from '@angular/core';

import {AsHtmlElementPipe, AsNgClassRequiredPipe, AsRequiredTypePipe, CastTypePipe} from '../pipes';

/**
 * Module that holds cast pipes
 */
@NgModule(
{
    imports:
    [
        AsHtmlElementPipe,
        AsNgClassRequiredPipe,
        AsRequiredTypePipe,
        CastTypePipe,
    ],
    exports:
    [
        AsHtmlElementPipe,
        AsNgClassRequiredPipe,
        AsRequiredTypePipe,
        CastTypePipe,
    ]
})
export class CastPipesModule
{
}