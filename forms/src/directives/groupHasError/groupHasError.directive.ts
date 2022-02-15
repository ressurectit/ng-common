import {Directive, ElementRef} from "@angular/core";
import {extend} from "@jscrpt/common";

/**
 * Default options for GroupHasErrorDirective
 */
const defaultOptions: GroupHasErrorOptions =
{
    cssClass: 'has-error'
}

/**
 * Options for GroupHasErrorDirective
 */
export interface GroupHasErrorOptions
{
    /**
     * Css class applied to element when there is an error
     */
    cssClass?: string;
}

/**
 * Directive that is attached to parent element of inputs group and handles css class that is added to this element
 */
@Directive(
{
    selector: '[groupHasError]'
})
export class GroupHasErrorDirective
{
    //######################### private fields #########################

    /**
     * Options for this directive
     */
    private _options: GroupHasErrorOptions = null;

    /**
     * Array of invalid controls
     */
    private _invalidControls: string[] = [];

    //######################### constructor #########################
    constructor(private _element: ElementRef<HTMLElement>)
    {
        this._options = extend(true, {}, defaultOptions);
    }

    //######################### public methods #########################

    /**
     * Registers control as invalid control
     * @param id - Name of control to be registered
     */
    public registerControl(id: string)
    {
        //control is not registered yet
        if(!this._invalidControls.find(itm => itm == id))
        {
            this._invalidControls.push(id);
        }

        this._updateStatus();
    }

    /**
     * Unregisters control from invalid controls
     * @param id - Id of control to be unregistered
     */
    public unregisterControl(id: string)
    {
        //control was registered already
        if(this._invalidControls.find(itm => itm == id))
        {
            this._invalidControls.splice(this._invalidControls.indexOf(id), 1);
        }

        this._updateStatus();
    }

    //######################### private methods #########################

    /**
     * Updates status of element (css classes)
     */
    private _updateStatus()
    {
        if(this._invalidControls.length)
        {
            this._element.nativeElement.classList.add(this._options.cssClass);
        }
        else
        {
            this._element.nativeElement.classList.remove(this._options.cssClass);
        }
    }
}