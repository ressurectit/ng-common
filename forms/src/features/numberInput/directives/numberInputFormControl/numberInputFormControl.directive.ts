import {computed, Directive, inject, input, InputSignal, model, ModelSignal, Signal} from '@angular/core';
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
        '(change)': 'changeValue($event.target.value)',
        '(input)': 'changeValue($event.target.value); touched.set(true)',
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
    constructor()
    {
        this.displayedValue = computed(() =>
        {
            const value = this.value();

            this.logger.verbose('NumberInput: Form control: setting input value "{{@(4)value}}"', {value});

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
    protected changeValue(value: string): void
    {
        if(isBlank(value) || value == '')
        {
            this.logger.verbose('NumberInput: Form control: setting control value to "null"');
            this.value.set(null);

            return;
        }

        //removing all spaces
        value = value.replace(/\s+/g, '');

        if(!/^[+-]?\d+(?:[,.]\d+)?$/g.test(value))
        {
            this.logger.verbose('NumberInput: Form control: setting control value to "NaN" because of invalid input "{{@(4)value}}"', {value});
            this.value.set(NaN);

            return;
        }

        this.logger.verbose('NumberInput: Form control: setting control value "{{@(4)value}}"', {value});
        this.value.set(parseFloat(value.replace(',', '.')));
    }
}
