import {Directive, ExistingProvider, forwardRef, Renderer2, ElementRef} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {isBlank} from '@jscrpt/common';

/**
 * Value accessor provider for number inputs
 */
const NUMBER_INPUT_VALUE_ACCESSOR = <ExistingProvider>
{
    provide: NG_VALUE_ACCESSOR, 
    useExisting: forwardRef(() => NumberInputControlValueAccessor), 
    multi: true,
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
        '(change)': 'onChange($event.target.value)',
        '(input)': 'onChange($event.target.value)',
        '(blur)': 'onTouched()',
        '[disabled]': 'disabled',
    }
})
export class NumberInputControlValueAccessor implements ControlValueAccessor
{
    //######################### public properties #########################
    
    public onChange = (_: any) => {};
    
    /**
     * Method that is called when picker was touched
     */
    public onTouched = () => {};

    /**
     * Indication whether is number input disabled
     */
    public disabled: boolean = false;
    
    //######################### constructor #########################
    constructor(private _renderer: Renderer2, private _elementRef: ElementRef)
    {
    }

    //######################### public methods - implementation of ControlValueAccessor #########################

    /**
     * @inheritdoc
     */
    public writeValue(value: any): void
    {
        this._renderer.setProperty(this._elementRef.nativeElement, 'value', value);
    }

    /**
     * @inheritdoc
     */
    public registerOnChange(fn: (data: any) => any): void
    {
        this.onChange = (value: string) => 
        { 
            if(isBlank(value) || value == '')
            {
                fn(null);
                
                return;
            }
            
            //removing all spaces
            value = value.replace(/\s+/g, '');
            
            if(!/^[+-]?\d+(?:[,.]\d+)?$/g.test(value))
            {
                fn(NaN);
                
                return;
            }
            
            fn(parseFloat(value.replace(',', '.'))); 
        };
    }

    /**
     * @inheritdoc
     */
    public registerOnTouched(fn: () => any): void
    {
        this.onTouched = fn;
    }

    /**
     * @inheritdoc
     */
    public setDisabledState?(isDisabled: boolean): void
    {
        this.disabled = isDisabled;
    }
}
