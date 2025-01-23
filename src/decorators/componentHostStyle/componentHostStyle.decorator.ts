import {ViewEncapsulation, ɵComponentDef, ɵComponentType} from '@angular/core';

/**
 * Applies css styles to host of component, requires at least empty style on Component
 * @param cssStyle - Css style properties to be applied
 *
 * @experimental
 */
export function ComponentHostStyle(cssStyle: string): ClassDecorator
{
    return function<TFunction extends Function> (target: TFunction): TFunction|void
    {
        const targetComponent: ɵComponentType<TFunction> = target as any;

        if(!targetComponent.ɵcmp)
        {
            throw new Error(`Unable to apply 'ComponentHostStyle' to '${target.name}'`);
        }

        const cmpDef: ɵComponentDef<TFunction> = targetComponent.ɵcmp as ɵComponentDef<TFunction>;

        if(!cmpDef.styles)
        {
            throw new Error('Missing styles on component');
        }

        cmpDef.styles.push(`${cmpDef.encapsulation == ViewEncapsulation.Emulated ? '[_nghost-%COMP%]' : ':host'}{${cssStyle}}`);

        return target;
    };
}
