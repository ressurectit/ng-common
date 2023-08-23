import {Component, ChangeDetectionStrategy, Inject, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Subscription} from 'rxjs';

import {ConsoleComponentLog, ConsoleComponentSinkData} from '../../interfaces';
import {CONSOLE_COMPONENT_SINK_SERVICE} from '../../misc/tokens';

/**
 * Component used for displaying console logs
 */
@Component(
{
    selector: 'console',
    templateUrl: 'console.component.html',
    styleUrls: ['console.component.css'],
    standalone: true,
    imports:
    [
        CommonModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsoleSAComponent implements OnInit, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Subscription for log changes
     */
    protected logsChangeSubscription: Subscription|undefined|null;

    //######################### protected properties - template bindings #########################

    /**
     * Current state of logger
     */
    protected currentLogs: ConsoleComponentLog[] = [];

    /**
     * Indication whether can use copy to clipboard
     */
    protected canCopy = navigator && navigator.clipboard;

    /**
     * Current value of filter
     */
    protected filterValue: string = '';

    //######################### constructor #########################
    constructor(@Inject(CONSOLE_COMPONENT_SINK_SERVICE) protected consoleSvc: ConsoleComponentSinkData,
                protected changeDetector: ChangeDetectorRef)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this.setMessages();
        
        this.logsChangeSubscription = this.consoleSvc.logsChange.subscribe(() =>
        {
            this.setMessages();
            this.changeDetector.detectChanges();
        });
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        if(this.logsChangeSubscription)
        {
            this.logsChangeSubscription.unsubscribe();
            this.logsChangeSubscription = null;
        }
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

        navigator.clipboard.writeText(this.currentLogs.map(log => log.text).join('\n'));
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

    /**
     * Sets messages using filter
     */
    protected setMessages(): void
    {
        if(!this.filterValue)
        {
            this.currentLogs = this.consoleSvc.logs;
        }
        else
        {
            this.currentLogs = this.consoleSvc.logs.filter(log => log.text.toLowerCase().indexOf(this.filterValue.toLowerCase()) >= 0);
        }
    }
}