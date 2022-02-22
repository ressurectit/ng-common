import {Pipe} from '@angular/core';

import {CastTypePipe} from '../castType/castType.pipe';

/**
 * Casts EventTarget to HTMLELement
 */
@Pipe({name: 'asHtmlElement'})
export class AsHtmlElementPipe extends CastTypePipe<EventTarget, HTMLElement>
{
}