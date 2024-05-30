import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HostDisplayBlockStyle} from '../../types/styles';
import {CollapsibleIconComponent} from '../collapsibleIcon/collapsibleIcon.component';

/**
 * Component used for displaying title with collapsible icon
 */
@Component(
{
    selector: 'collapsible-title',
    templateUrl: 'collapsibleTitle.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    imports:
    [
        CommonModule,
        CollapsibleIconComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollapsibleTitleComponent
{
    //######################### public properties - inputs #########################

    /**
     * Initial value, if visible set to true minus is displayed, otherwise plus is displayed
     */
    @Input()
    public visible: boolean = false;

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