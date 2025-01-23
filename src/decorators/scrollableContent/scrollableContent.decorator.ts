import {ComponentHostStyle} from '../componentHostStyle/componentHostStyle.decorator';

/**
 * Applies css overflow-y scroll style to host of component, requires at least empty style on Component
 *
 * @experimental
 */
export function ScrollableContent(): ClassDecorator
{
    return ComponentHostStyle('overflow-y: scroll;');
}
