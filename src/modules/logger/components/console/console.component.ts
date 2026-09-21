import {Component, computed, input, InputSignal, signal, Signal, WritableSignal} from '@angular/core';
import {LowerCasePipe} from '@angular/common';

import {ConsoleComponentLog} from '../../interfaces';
import {ConsoleComponentService} from '../../services';
import {IsPresentPipe} from '../../../../pipes';

/**
 * Component used for displaying console logs
 */
@Component(
{
    selector: 'console',
    templateUrl: 'console.component.html',
    styleUrl: 'console.component.css',
    host:
    {
        'animate.enter': 'slide-in',
        'animate.leave': 'slide-out',
    },
    imports:
    [
        LowerCasePipe,
        IsPresentPipe,
    ],
})
export class Console
{
    //######################### protected properties - template bindings #########################

    /**
     * Current state of logger
     */
    protected currentLogs: Signal<ConsoleComponentLog[]>;

    /**
     * Indication whether can use copy to clipboard
     */
    protected canCopy = navigator && navigator.clipboard;

    /**
     * Current value of filter
     */
    protected filterValue: WritableSignal<string> = signal('');

    /**
     * Filtering tags derived from filterRegex
     */
    protected filteringTags: Signal<[RegExp, WritableSignal<boolean|undefined|null>][]>;

    //######################### public properties - inputs #########################

    /**
     * Array of regular expressions used for filtering logs
     */
    public filterRegex: InputSignal<RegExp[]> = input([]);

    //######################### constructor #########################
    constructor(protected consoleSvc: ConsoleComponentService,)
    {
        this.filteringTags = computed(() => this.filterRegex().map(regex => [regex, signal(undefined)] as [RegExp, WritableSignal<boolean|undefined|null>]));

        this.currentLogs = computed(() =>
        {
            let logs = this.consoleSvc.logs();
            const tags = this.filteringTags();

            const orTags = tags.filter(([_, tagValue]) => tagValue() === true).map(([regex]) => regex);
            const andTags = tags.filter(([_, tagValue]) => tagValue() === false).map(([regex]) => regex);
            const orLogs = [];

            for(const regex of orTags)
            {
                orLogs.push(...logs.filter(log => regex.test(log.text)));
            }

            if(orTags.length)
            {
                logs = orLogs;
            }

            for(const regex of andTags)
            {
                logs = logs.filter(log => !regex.test(log.text));
            }

            return logs.filter(log => log.text.toLowerCase().indexOf(this.filterValue().toLowerCase()) >= 0);
        });
    }

    //######################### protected methods - template bindings #########################

    /**
     * Copies content of whole console log into clipboard
     */
    protected copy(): void
    {
        if(!navigator || !navigator.clipboard)
        {
            return;
        }

        navigator.clipboard.writeText(this.currentLogs().map(log => log.text).join('\n'));
    }

    /**
     * Copies message to clipboard
     * @param message - Message to be copied
     */
    protected copyMessage(message: string): void
    {
        if(!navigator || !navigator.clipboard)
        {
            return;
        }

        navigator.clipboard.writeText(message);
    }

    /**
     * Clears existing logs
     */
    protected clear(): void
    {
        this.consoleSvc.clear();
    }
}
