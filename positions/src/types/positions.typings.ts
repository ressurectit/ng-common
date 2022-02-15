/**
 * Coordinates for positioning target
 */
export interface PositionsCss
{
    /**
     * Top css property
     */
    top?: number;

    /**
     * Left css property
     */
    left?: number;
}

/**
 * Posible coordinates
 */
export type PositionsCoordinates = 'top left'|'top center'|'top right'|'center left'|'center center'|'center right'|'bottom left'|'bottom center'|'bottom right';

/**
 * Description of position function
 */
export interface PositionsFunc
{
    /**
     * Computes positions for element relative to target
     * @param element Element that will be positioned
     * @param elementCoordinates Relative coordinates of element
     * @param target Target element which will be element positioned against
     * @param targetCoordinates Relative coordinates of target element
     */
    (element: HTMLElement, elementCoordinates: PositionsCoordinates, target: HTMLElement, targetCoordinates: PositionsCoordinates): PositionsCss;
}

declare const positions: PositionsFunc;

export default positions;
