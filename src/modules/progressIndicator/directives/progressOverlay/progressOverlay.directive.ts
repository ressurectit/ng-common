import {Directive, Input, OnInit, OnDestroy, ElementRef, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Subscription} from 'rxjs';

import {ProgressIndicatorService} from '../../services/progressIndicator.service';
import {STRING_LOCALIZATION} from '../../../../types/tokens';
import {StringLocalization} from '../../../../services/stringLocalization';

/**
 * Directive that is used for displaying progress indicator as overlay
 */
@Directive(
{
    selector: '[progressOverlay]'
})
export class ProgressOverlayDirective implements OnInit, OnDestroy
{
    //######################### private fields #########################
    
    /**
     * Previous css position value
     */
    private _notRunningCssPosition: string;

    /**
     * Previous css overflow value
     */
    private _notRunningOverflow: string;

    /**
     * Subscription for changes in ProgressIndicatorService
     */
    private _subscription: Subscription|null;

    /**
     * Array of messages that should be displayed
     */
    private _messages: string[];

    /**
     * Indication that this progress indicator is running
     */
    private _running: boolean;

    /**
     * Element that is displaying progress indicator overlay
     */
    private _progressElement: HTMLDivElement;

    /**
     * Html messages element
     */
    private _messagesElement: HTMLDivElement;

    /**
     * Html message elements, last three
     */
    private _lastThreeMessages: HTMLDivElement[] = [];

    //######################### public properties - inputs #########################

    /**
     * Name of progress indicator group
     */
    @Input('progressOverlay')
    public name: string;

    //######################### constructor #########################
    constructor(private _service: ProgressIndicatorService,
                private _element: ElementRef<HTMLElement>,
                @Inject(DOCUMENT) private _document: HTMLDocument,
                @Inject(STRING_LOCALIZATION) private _localizationSvc: StringLocalization)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit()
    {
        this._service.registerOverlayGroup(this.name);

        this._running = this._service.running[this.name];
        this._messages = this._service.messages[this.name] || [];
        this._renderProgressOverlay();

        this._subscription = this._service.stateChange.subscribe(name => 
        {
            if(name == this.name)
            {
                this._running = this._service.running[this.name];
                this._messages = this._service.messages[this.name] || [];
                this._renderProgressOverlay();
            }
        });
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        this._service.unregisterOverlayGroup(this.name);

        if(this._subscription)
        {
            this._subscription.unsubscribe();
            this._subscription = null;
        }
    }

    //######################### private methods #########################

    /**
     * Renders progress overlay
     */
    private _renderProgressOverlay()
    {
        //removes progress indicator
        if(this._progressElement && !this._running)
        {
            this._progressElement.remove();
            this._progressElement = null;
            this._messagesElement = null;
            this._lastThreeMessages = [];

            this._element.nativeElement.style.position = this._notRunningCssPosition;
            this._notRunningCssPosition = null;
            this._element.nativeElement.style.overflow = this._notRunningOverflow;
            this._notRunningOverflow = null;
        }
        //adds progress indicator
        else if(!this._progressElement && this._running)
        {
            this._notRunningCssPosition = this._element.nativeElement.style.position;
            this._element.nativeElement.style.position = 'relative';
            this._notRunningOverflow = this._element.nativeElement.style.overflow;
            this._element.nativeElement.style.overflow = 'hidden';

            this._progressElement = this._document.createElement('div');
            this._progressElement.className = "progress-overlay-div";

            let spinner = this._document.createElement('div');
            spinner.className = "spinner";
            this._progressElement.append(spinner);

            this._messagesElement = this._document.createElement('div');
            this._messagesElement.className = "messages";
            this._progressElement.append(this._messagesElement);

            this._element.nativeElement.append(this._progressElement);

        }

        this._renderProgressMessages();
    }

    /**
     * Renders messages to progress overlay
     */
    private _renderProgressMessages()
    {
        if(!this._messagesElement)
        {
            return;
        }

        let newMessages = this._messages.slice(this._messagesElement.childNodes.length);

        for(let message of newMessages)
        {
            let messageDiv = this._document.createElement('div');
            messageDiv.textContent = this._localizationSvc.get(message);

            this._lastThreeMessages.unshift(messageDiv);
            this._messagesElement.append(messageDiv);
            
            let outMessagesDiv = this._lastThreeMessages.splice(3);

            outMessagesDiv.forEach(outMsg =>
            {
                outMsg.className = "message-out";
            });

            this._lastThreeMessages.forEach((msg, index) =>
            {
                msg.className = `message-${index}`;
            });
        }
    }
}