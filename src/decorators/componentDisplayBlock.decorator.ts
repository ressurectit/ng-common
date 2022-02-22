import {ComponentDisplay} from './componentDisplay.decorator';

/**
 * Applies css display block style to host of component, requires at least empty style on Component
 * 
 * @experimental
 */
export function ComponentDisplayBlock(): ClassDecorator
{
    return ComponentDisplay('block');
}
