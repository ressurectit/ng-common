import {Directive, ExistingProvider, forwardRef, Renderer, ElementRef} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {isBlank} from '../../utils/lang';

/**
 * Value accessor provider for number inputs
 */
const NUMBER_INPUT_VALUE_ACCESSOR = <ExistingProvider>
{
    provide: NG_VALUE_ACCESSOR, 
    useExisting: forwardRef(() => NumberInputControlValueAccessor), 
    multi: true
};

/**
 * Value accessor for getting and setting values for number inputs
 */
@Directive(
{
    selector: 'input[number][formControlName],input[number][formControl],input[number][ngModel]',
    providers: [NUMBER_INPUT_VALUE_ACCESSOR],
    host: 
    {
        '(change)': '_onChange($event.target.value)',
        '(input)': '_onChange($event.target.value)',
        '(blur)': '_onTouched()'
    }
})
export class NumberInputControlValueAccessor implements ControlValueAccessor
{
    //######################### private fields #########################
    
    private _onChange = (_: any) => {};
    
    /**
     * Method that is called when picker was touched
     */
    private _onTouched = () => {};
    
    //######################### constructor #########################
    constructor(private _renderer: Renderer, private _elementRef: ElementRef)
    {
    }

    //######################### public methods - implementation of ControlValueAccessor #########################

    /**
     * Sets value to select
     */
    public writeValue(value: any): void
    {
        this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', value);
    }

    /**
     * Registers callback that is called when value of select changes
     */
    public registerOnChange(fn: (data: any) => any): void
    {
        this._onChange = (value: string) => 
        { 
            if(isBlank(value) || value == '')
            {
                fn(null);
                
                return;
            }
            
            if(!/^[+-]?\d+(?:[,.]\d+)?$/g.test(value))
            {
                fn(NaN);
                
                return;
            };
            
            fn(parseFloat(value.replace(",", "."))); 
        };
    }

    /**
     * Registers callback that is called when select is closed
     */
    public registerOnTouched(fn: () => any): void
    {
        this._onTouched = fn;
    }
}
