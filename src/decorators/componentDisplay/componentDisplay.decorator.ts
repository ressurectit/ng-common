import {CssDisplay} from '@jscrpt/common';

import {ComponentHostStyle} from '../componentHostStyle/componentHostStyle.decorator';

/**
 * Applies css display style to host of component, requires at least empty style on Component
 * @param display - Css display value
 *
 * @experimental
 */
export function ComponentDisplay(display: CssDisplay): ClassDecorator
{
    return ComponentHostStyle(`display: ${display}`);
}
