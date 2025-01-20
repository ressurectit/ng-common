import {Directive, HostBinding, HostListener, Input} from '@angular/core';
import {Clipboard} from '@angular/cdk/clipboard';

/**
 * Directive that allows to copy data to clipboard on click on debug-data
 */
@Directive(
{
    selector: 'debug-data[copyClick]',
})
export class DebugDataCopyClickDirective
{
    //######################### public properties - inputs #########################

    /**
     * Data to be copied as serialized json
     */
    @Input('copyClick')
    public data: unknown;

    //######################### public properties - host #########################

    /**
     * Adds css class clickable to this element
     * 
     * @internal
     */
    @HostBinding('class.clickable')
    public clickable: boolean = true;

    //######################### constructor #########################
    constructor(protected _clipboard: Clipboard)
    {
    }

    //######################### public methods - host #########################

    /**
     * Copies data to clipboard on click
     * 
     * @internal
     */
    @HostListener('click')
    public copyData(): void
    {
        this._clipboard.copy(JSON.stringify(this.data, null, 4));
    }
}