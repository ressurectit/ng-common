import {ComponentDisplay} from '../componentDisplay/componentDisplay.decorator';

/**
 * Applies css display flex style to host of component, requires at least empty style on Component
 *
 * @experimental
 */
export function ComponentDisplayFlex(): ClassDecorator
{
    return ComponentDisplay('flex');
}
