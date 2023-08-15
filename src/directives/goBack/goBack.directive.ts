import {Directive, HostListener} from '@angular/core';
import {Location} from '@angular/common';

/**
 * Directive that performs browser back button action on click
 */
@Directive(
{
    selector: '[goBack]',
    standalone: true,
})
export class GoBackSADirective
{
    //######################### constructor #########################
    constructor(private _location: Location)
    {
    }

    //######################### public methods - host #########################

    /**
     * Navigates back in browser
     * @param event - Mouse event that occured
     */
    @HostListener('click', ['$event'])
    public goBack(event: MouseEvent): void
    {
        event.preventDefault();
        event.stopPropagation();

        this._location.back();
    }
}