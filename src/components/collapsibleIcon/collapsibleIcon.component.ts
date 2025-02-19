import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TooltipModule} from '../../modules/tooltip';
import {LocalizePipe} from '../../pipes';

/**
 * Component used for displaying collapsible icon
 */
@Component(
{
    selector: 'collapsible-icon',
    templateUrl: 'collapsibleIcon.component.html',
    styleUrl: 'collapsibleIcon.component.css',
    imports:
    [
        CommonModule,
        TooltipModule,
        LocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollapsibleIconComponent
{
    //######################### public properties - inputs #########################

    /**
     * Initial value, if visible set to true minus is displayed, otherwise plus is displayed
     */
    @Input()
    public visible: boolean = false;

    /**
     * Text of title
     */
    @Input()
    public titleText: string = 'show/hide detail';

    /**
     * Css class applied to button
     */
    @Input()
    public cssClass: string|undefined|null;

    //######################### public properties - outputs #########################

    /**
     * Occurs when visible change
     */
    @Output()
    public visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
}