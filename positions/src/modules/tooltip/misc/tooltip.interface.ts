import {TemplateRef, Type} from '@angular/core';
import type {PositionsCoordinates} from 'positions';

/**
 * Represents component that is used for rendering tooltip
 */
export interface TooltipRenderer<TData = any>
{
    //######################### properties #########################

    /**
     * Data that are rendered in tooltip
     */
    data: TData|null;

    /**
     * Template used for rendering tooltip
     */
    template: TemplateRef<TData>|null;

    /**
     * Indication whether are html tags allowed in tooltip text
     */
    allowHtml: boolean;

    /**
     * Css class that is applied to tooltip renderer component
     */
    cssClass: string|null;

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
    delay?: number;

    /**
     * Indication whether is tooltip displayed at fixed position, or if it is displayed where cursor enters element
     */
    fixedPosition?: boolean;

    /**
     * Position where should be tooltip displayed at element
     */
    elementPositionAt?: PositionsCoordinates;

    /**
     * Position of tooltip where should placed at
     */
    tooltipPosition?: PositionsCoordinates;

    /**
     * Allows selection of text in tooltip
     */
    allowSelection?: boolean|null;

    /**
     * Css class that is applied to tooltip renderer component
     */
    tooltipCssClass?: string|null;

    /**\
     * Indication whether stop propagation of "hover" event
     */
    stopPropagation?: boolean|null;

    /**
     * Type of tooltip renderer that is used for rendering tooltip
     */
    tooltipRenderer?: Type<TooltipRenderer>;
}