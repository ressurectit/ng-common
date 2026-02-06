import {computed, Directive, Inject, input, InputSignal, Optional, signal, Signal, WritableSignal} from '@angular/core';
import {RecursivePartial} from '@jscrpt/common';
import {deepCopyWithArrayOverride} from '@jscrpt/common/lodash';

import {GroupHasErrorOptions} from '../../interfaces';
import {GROUP_HAS_ERROR_OPTIONS} from '../../misc/tokens';

/**
 * Default options for `GroupHasError`
 */
const defaultOptions: GroupHasErrorOptions =
{
    cssClass: 'has-error',
};

/**
 * Directive that is attached to parent element of inputs group and handles css class that is added to this element
 */
@Directive(
{
    selector: '[groupHasError]',
    host:
    {
        '[class]': 'computedCssClass()',
    },
})
export class GroupHasError
{
    //######################### protected fields #########################

    /**
     * Array of invalid form fields
     */
    protected invalidFormFields: WritableSignal<string[]> = signal([]);

    /**
     * Computed css class that is applied
     */
    protected computedCssClass: Signal<string|string[]|undefined|null>;

    //######################### public properties - inputs #########################

    /**
     * Css class that is applied to element
     */
    public cssClass: InputSignal<string|string[]|undefined|null> = input();

    //######################### constructor #########################
    constructor(@Optional() @Inject(GROUP_HAS_ERROR_OPTIONS) options: RecursivePartial<GroupHasErrorOptions>|null,)
    {
        options = deepCopyWithArrayOverride({}, defaultOptions, options);

        this.computedCssClass = computed(() => this.invalidFormFields().length ? this.cssClass() ?? options.cssClass : null);
    }

    //######################### public methods #########################

    /**
     * Registers form field as invalid
     * @param id - Unique id of form field
     */
    public registerFormField(id: string): void
    {
        if(!this.invalidFormFields().find(itm => itm == id))
        {
            this.invalidFormFields.update(itm => [...itm, id]);
        }
    }

    /**
     * Unregisters form field
     * @param id - Unique id of form field
     */
    public unregisterFormField(id: string): void
    {
        if(this.invalidFormFields().find(itm => itm == id))
        {
            this.invalidFormFields().splice(this.invalidFormFields().indexOf(id), 1);
            this.invalidFormFields.set([...this.invalidFormFields()]);
        }
    }
}
