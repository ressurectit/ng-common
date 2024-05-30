import {Directive, Optional, AfterViewInit, Renderer2, Input, ElementRef} from '@angular/core';
import {FormControlDirective, FormControlName, FormControl, Validators} from '@angular/forms';

/**
 * Transforms empty class name to default class name 'required'
 */
function requiredClassTransform(value: string): string
{
    return value || 'required';
}

/**
 * Required class directive adds required class to element if it has required validator
 */
@Directive(
{
    selector: '[requiredClass][formControlName],[requiredClass][formControl]',
    standalone: true,
})
export class RequiredClassDirective implements AfterViewInit
{
    //######################### protected properties #########################

    /**
     * Gets control which was assigned to this element
     */
    protected get control(): FormControl
    {
        return (this._formControl && this._formControl.control) || (this._formControlName && this._formControlName.control);
    }

    //######################### public properties - inputs #########################

    /**
     * Name of required css class that should be applied
     */
    @Input({transform: requiredClassTransform})
    public requiredClass: string = 'required';

    //######################### constructor #########################
    constructor(@Optional() protected _formControl: FormControlDirective,
                @Optional() protected _formControlName: FormControlName,
                protected _renderer: Renderer2,
                protected _element: ElementRef<HTMLElement>,)
    {
    }

    //######################### public methods - implementation of AfterViewInit #########################
    
    /**
     * Called when view was initialized
     */
    public ngAfterViewInit(): void
    {
        const required = this.control?.hasValidator(Validators.required);

        if(required)
        {
            this._renderer.addClass(this._element.nativeElement, this.requiredClass);
        }
        else
        {
            this._renderer.removeClass(this._element.nativeElement, this.requiredClass);
        }
    }
}