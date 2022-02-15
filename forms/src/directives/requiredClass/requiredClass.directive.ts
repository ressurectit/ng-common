import {Directive, Optional, AfterViewInit, HostBinding, ChangeDetectorRef} from "@angular/core";
import {FormControlDirective, FormControlName, FormControl} from "@angular/forms";

/**
 * Required class directive adds required class to element
 */
@Directive(
{
    selector: '[requiredClass]'
})
export class RequiredClassDirective implements AfterViewInit
{
    //######################### private properties #########################

    /**
     * Gets control which was assigned to this element
     */
    private get control(): FormControl
    {
        return (this._formControl && this._formControl.control) || (this._formControlName && this._formControlName.control);
    }

    //######################### public properties - host #########################

    /**
     * Handles css class for required input
     */
    @HostBinding('class.required')
    public required: boolean = false;

    //######################### constructor #########################
    constructor(@Optional() private _formControl: FormControlDirective,
                @Optional() private _formControlName: FormControlName,
                private _changeDetector: ChangeDetectorRef)
    {
    }

    //######################### public methods - implementation of AfterViewInit #########################
    
    /**
     * Called when view was initialized
     */
    public ngAfterViewInit()
    {
        let control = this.control;

        if(control && control.validator)
        {
            let validationResult = control.validator(new FormControl(null));
            this.required = validationResult && validationResult.required;

            this._changeDetector.detectChanges();
        }
    }
}