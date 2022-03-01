import {Observable} from 'rxjs';

import {PositionOffset, PositionPlacement} from './position.types';

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
     * Offset which allows moving target element along the cross axis of placement
     */
    offset: PositionOffset;

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
