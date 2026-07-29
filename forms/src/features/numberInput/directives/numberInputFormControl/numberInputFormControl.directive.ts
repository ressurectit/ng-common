import {computed, Directive, ElementRef, inject, input, InputSignal, model, ModelSignal, signal, Signal, WritableSignal} from '@angular/core';
import {FormValueControl} from '@angular/forms/signals';
import {LOGGER, Logger} from '@anglr/common';
import {isBlank} from '@jscrpt/common';

/**
 * Form value control for Number Input
 */
@Directive(
{
    selector: 'input[number][formField]',
    host:
    {
        '(change)': 'changeValue($event.target)',
        '(input)': 'changeValue($event.target); touched.set(true)',
        '(blur)': 'touched.set(true)',
        '[disabled]': 'disabled() || readonly()',
        '[value]': 'displayedValue()',
    },
})
export class NumberInputFormControl implements FormValueControl<number|null|undefined>
{
    //######################### protected fields #########################

    /**
     * Instance of logger for logging purposes
     */
    protected logger: Logger = inject(LOGGER);

    /**
     * Value that is displayed in input, it is used to prevent displaying invalid values in input
     */
    protected displayedValue: Signal<string>;

    /**
     * Internal value of form control, used for protecting input from changing value during change from input
     */
    protected internalValue: WritableSignal<number|null|undefined> = signal(undefined);

    //######################### public properties - implementation of FormValueControl #########################

    /**
     * @inheritdoc
     */
    public readonly value: ModelSignal<number|null|undefined> = model<number|null|undefined>(undefined);

    /**
     * @inheritdoc
     */
    public checked: undefined;

    /**
     * @inheritdoc
     */
    public readonly disabled: InputSignal<boolean> = input(false);

    /**
     * @inheritdoc
     */
    public readonly readonly: InputSignal<boolean> = input(false);

    /**
     * @inheritdoc
     */
    public readonly touched: ModelSignal<boolean> = model(false);

    //######################### constructor #########################
    constructor(element: ElementRef<HTMLInputElement>)
    {
        this.displayedValue = computed(() =>
        {
            const value = this.value();
            const internalValue = this.internalValue();

            if(value === internalValue || (isNaN(value ?? 0) && isNaN(internalValue ?? 0)))
            {
                return element.nativeElement.value;
            }

            this.logger.verbose('NumberInput: Form control: setting input value "{{value}}"', {value});

            if(isBlank(value) || isNaN(value))
            {
                return '';
            }

            return value.toString();
        });
    }

    //######################### protected methods #########################

    /**
     * Handles change of value in input
     * @param value - Changed value from input
     */
    protected changeValue(target: EventTarget|null): void
    {
        if(!target)
        {
            throw new Error('NumberInput: Form control: target is null');
        }

        let value = (target as HTMLInputElement).value;

        if(isBlank(value) || value == '')
        {
            this.logger.verbose('NumberInput: Form control: setting control value to "null"');
            this.internalValue.set(null);
            this.value.set(null);

            return;
        }

        //removing all spaces
        value = value.replace(/\s+/g, '');

        if(!/^[+-]?\d+(?:[,.]\d+)?$/g.test(value))
        {
            this.logger.verbose('NumberInput: Form control: setting control value to "NaN" because of invalid input "{{value}}"', {value});
            this.internalValue.set(NaN);
            this.value.set(NaN);

            return;
        }

        const parsedValue = parseFloat(value.replace(',', '.'));
        this.logger.verbose('NumberInput: Form control: setting control value "{{parsedValue}}"', {parsedValue});
        this.internalValue.set(parsedValue);
        this.value.set(parsedValue);
    }
}
