import {Func1} from '@jscrpt/common';
import {Observable} from 'rxjs';

import {PositionOffsetString, PositionPlacement} from './position.types';

/**
 * Options for autoupdate specific functionality
 */
export interface AutoUpdateOptions
{
    /**
     * Indication whether update position when ancestor scroll changes
     */
    ancestorScroll: boolean;

    /**
     * Indication whether update position when ancestor size changes
     */
    ancestorResize: boolean;

    /**
     * Indication whether update position when target element changes size
     */
    elementResize: boolean;
}

/**
 * Defines object which describes offsets for positioned element
 */
export interface PositionOffsets
{
    /**
     * Distance between positioned and reference element.
     */
    mainAxis?: number;

    /**
     * Skidding between floating and reference element.
     */
    crossAxis?: number;

    /**
     * Works on the same axis as crossAxis but applies only to aligned placements and works logically. The offset is inverted for -end alignments.
     */
    alignmentAxis?: number|null;
}

/**
 * Stores positioned element and reference element
 */
export interface PositionElements<TElement extends Element = Element>
{
    /**
     * Reference element against which is object positioned
     */
    reference: TElement;

    /**
     * Element that is positioned
     */
    floating: TElement;
}

/**
 * Arguments that are passed during positioning
 */
export interface PositionArguments<TElement extends Element = Element>
{
    /**
     * X coordinate of positioned element
     */
    x: number;

    /**
     * Y coordinate of positioned element
     */
    y: number;

    /**
     * Elements that are being used during positioning
     */
    elements: PositionElements<TElement>;
}

/**
 * Options that are passed to position service
 */
export interface PositionOptions
{
    //######################### properties #########################

    /**
     * Placement of target element against source element
     */
    placement: PositionPlacement;

    /**
     * Offset which allows moving target element along the cross axis of placement, or any chosed direction
     */
    offset: PositionOffsetString|number|PositionOffsets|Func1<number|PositionOffsets, PositionArguments>;

    /**
     * Indication whether perform flip in case of collision (with view boundaries)
     */
    flip: boolean;

    /**
     * Indication whether set up 'auto updating' of position
     */
    autoUpdate: boolean|AutoUpdateOptions;

    /**
     * Mouse event that occured when positioning was called
     */
    mouseEvent?: MouseEvent;
}

/**
 * Result of positioning process, storing new coordinates
 */
export interface PositionResult<TElement extends Element = any>
{
    /**
     * Target element to be positioned
     */
    target: TElement;

    /**
     * X coordinate of position of target
     */
    x: number;

    /**
     * Y coordinate of position of target
     */
    y: number;

    /**
     * Indication whether there was flip applied
     */
    flip: boolean;

    /**
     * Disposes instance of engine used for positioning
     */
    dispose(): void;
}

/**
 * Service that is used for positioning two elements against each other
 */
export interface Position
{
    //######################### methods #########################

    /**
     * Places target element relatively to source element according options and returns result storing information about new position
     * @param target - Target element to be placed
     * @param source - Source element to be placed against
     * @param options - Optional options with informations about new position
     */
    placeElement(target: Element, source: Element, options?: Partial<PositionOptions>): Observable<PositionResult>;
}
