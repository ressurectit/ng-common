import {TemplateRef, Type} from '@angular/core';

import {PositionOptions} from '../../../services/position';

/**
 * Represents component that is used for rendering tooltip
 */
export interface TooltipRenderer<TData = any>
{
    //######################### properties #########################

    /**
     * Data that are rendered in tooltip
     */
    data: TData|null|undefined;

    /**
     * Template used for rendering tooltip
     */
    template: TemplateRef<TData>|null|undefined;

    /**
     * Indication whether are html tags allowed in tooltip text
     */
    allowHtml: boolean;

    /**
     * Css class that is applied to tooltip renderer component
     */
    cssClass: string|null|undefined;

    //######################### methods #########################

    /**
     * Registers handlers that allows reaction to entering or leaving tooltip
     * @param enter - Called when mouse enter tooltip component, hover
     * @param leave - Called when mouse leaves tooltip component
     */
    registerHoverEvents(enter: () => void, leave: () => void): void;

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    invalidateVisuals(): void;
}

/**
 * Options used for tooltip directive
 */
export interface TooltipOptions
{
    /**
     * Delay for displaying of tooltip on hover
     */
    delay: number;

    /**
     * Position where should tooltip appear relative to its parent
     */
    position: Pick<PositionOptions, 'placement'|'offset'>;

    /**
     * Allows selection of text in tooltip
     */
    allowSelection: boolean|null;

    /**
     * Css class that is applied to tooltip renderer component
     */
    tooltipCssClass: string|null;

    /**
     * Indication whether stop propagation of "hover" event
     */
    stopPropagation: boolean|null;

    /**
     * Type of tooltip renderer that is used for rendering tooltip
     */
    tooltipRenderer: Type<TooltipRenderer>;
}