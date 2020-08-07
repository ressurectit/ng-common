import positions from 'positions';

/**
 * Available flip directions
 */
export type FLIP_DIRECTION = 'vertical'|'horizontal';

/**
 * Function to be called when flip occurs
 */
export interface FlipCallback
{
    (direction: FLIP_DIRECTION): void;
}

/**
 * Updates height of element
 * @param element - Element that will be positioned
 * @param target - Target element which will be element positioned against
 * @param htmlDocument - HTML document instance
 */
function updateHeight(element: HTMLElement, target: HTMLElement, htmlDocument: HTMLDocument): void
{
    let rect = element.getBoundingClientRect(),
        targetRect = target.getBoundingClientRect(),
        h = Math.max(htmlDocument.documentElement.clientHeight, window.innerHeight || 0);

    //popup is above
    if(rect.top < targetRect.top)
    {
        //space above is not enough
        element.style.maxHeight = `${targetRect.top - 6}px`;
    }
    //popup is below
    else
    {
        //space below is not enough
        element.style.maxHeight = `${h - targetRect.bottom - 6}px`;
    }
}

/**
 * Flips html element position if collision occur
 * @param element - Element that will be positioned
 * @param elementCoordinates - Relative coordinates of element
 * @param target - Target element which will be element positioned against
 * @param targetCoordinates - Relative coordinates of target element
 * @param htmlDocument - HTML document instance
 * @param flipCallback - Callback called when flip occured during positioning
 */
function flipIfCollision(element: HTMLElement,
                         elementCoordinates: Positions.PositionsCoordinates,
                         target: HTMLElement,
                         targetCoordinates: Positions.PositionsCoordinates,
                         htmlDocument: HTMLDocument,
                         flipCallback: FlipCallback): [Positions.PositionsCss, Positions.PositionsCoordinates, Positions.PositionsCoordinates]
{
    let w = Math.max(htmlDocument.documentElement.clientWidth, window.innerWidth || 0),
        h = Math.max(htmlDocument.documentElement.clientHeight, window.innerHeight || 0),
        rect = element.getBoundingClientRect(),
        targetRect = target.getBoundingClientRect(),
        spaceAbove = targetRect.top,
        spaceUnder = h - targetRect.bottom,
        spaceBefore = targetRect.left,
        spaceAfter = w - targetRect.right;

    //vertical overflow
    if((h < rect.bottom &&
        spaceUnder < spaceAbove) ||
       (rect.top < 0 &&
        spaceAbove < spaceUnder))
    {
        elementCoordinates = flipVertiacal(elementCoordinates);
        targetCoordinates = flipVertiacal(targetCoordinates);
        flipCallback('vertical');
    }

    //horizontal overflow
    if((w < (rect.left + rect.width) &&
        spaceAfter < spaceBefore) ||
       (rect.left < 0 &&
        spaceBefore < spaceAfter))
    {
        elementCoordinates = flipHorizontal(elementCoordinates);
        targetCoordinates = flipHorizontal(targetCoordinates);
        flipCallback('horizontal');
    }

    return [positions(element, elementCoordinates, target, targetCoordinates), elementCoordinates, targetCoordinates];
}

/**
 * Flips vertical position
 * @param position - Position to be flipped vertically
 */
function flipVertiacal(position: Positions.PositionsCoordinates): Positions.PositionsCoordinates
{
    if(position.indexOf('top') >= 0)
    {
        return position.replace('top', 'bottom') as Positions.PositionsCoordinates;
    }
    else if(position.indexOf('bottom') >= 0)
    {
        return position.replace('bottom', 'top') as Positions.PositionsCoordinates;
    }

    return position;
}

/**
 * Flips horizontal position
 * @param position - Position to be flipped horizontally
 */
function flipHorizontal(position: Positions.PositionsCoordinates): Positions.PositionsCoordinates
{
    if(position.indexOf('right') >= 0)
    {
        return position.replace('right', 'left') as Positions.PositionsCoordinates;
    }
    else if(position.indexOf('left') >= 0)
    {
        return position.replace('left', 'right') as Positions.PositionsCoordinates;
    }

    return position;
}

/**
 * Computes and applies position for element relative to target, if there is collision it automatically flips
 * @param element - Element that will be positioned
 * @param elementCoordinates - Relative coordinates of element
 * @param target - Target element which will be element positioned against
 * @param targetCoordinates - Relative coordinates of target element
 * @param htmlDocument - HTML document instance
 * @param flipCallback - Callback called when flip occured during positioning
 */
export function positionsWithFlip(element: HTMLElement,
                                  elementCoordinates: Positions.PositionsCoordinates,
                                  target: HTMLElement,
                                  targetCoordinates: Positions.PositionsCoordinates,
                                  htmlDocument: HTMLDocument = document,
                                  flipCallback: FlipCallback = () => {}): void
{
    //set to default position
    let popupCoordinates = positions(element, elementCoordinates, target, targetCoordinates);
    element.style.left = `${popupCoordinates.left}px`;
    element.style.top = `${popupCoordinates.top}px`;
    element.style.maxHeight = '';

    //flip if collision with viewport
    [popupCoordinates, elementCoordinates, targetCoordinates] = flipIfCollision(element, elementCoordinates, target, targetCoordinates, htmlDocument, flipCallback);
    element.style.left = `${popupCoordinates.left}px`;
    element.style.top = `${popupCoordinates.top}px`;

    //set maxHeight if there is not more place
    updateHeight(element, target, htmlDocument);
    popupCoordinates = positions(element, elementCoordinates, target, targetCoordinates);
    element.style.left = `${popupCoordinates.left}px`;
    element.style.top = `${popupCoordinates.top}px`;
}