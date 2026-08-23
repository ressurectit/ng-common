import {ConnectedPosition, HorizontalConnectionPos, VerticalConnectionPos} from '@angular/cdk/overlay';
import {PositionPlacement} from '@anglr/common';

import {PopoverAlignment, PopoverSide} from './types';

/**
 * Decomposition of `PositionPlacement` into popover side and cross axis alignment
 */
const placementSides: Record<PositionPlacement, [PopoverSide, PopoverAlignment]> =
    {
        [PositionPlacement.Top]: ['top', 'center'],
        [PositionPlacement.TopStart]: ['top', 'start'],
        [PositionPlacement.TopEnd]: ['top', 'end'],
        [PositionPlacement.Left]: ['left', 'center'],
        [PositionPlacement.LeftStart]: ['left', 'start'],
        [PositionPlacement.LeftEnd]: ['left', 'end'],
        [PositionPlacement.Right]: ['right', 'center'],
        [PositionPlacement.RightStart]: ['right', 'start'],
        [PositionPlacement.RightEnd]: ['right', 'end'],
        [PositionPlacement.Bottom]: ['bottom', 'center'],
        [PositionPlacement.BottomStart]: ['bottom', 'start'],
        [PositionPlacement.BottomEnd]: ['bottom', 'end'],
    };

/**
 * Sides used as flip fallback when there is not enough space at configured side
 */
const oppositeSides: Record<PopoverSide, PopoverSide> =
    {
        top: 'bottom',
        bottom: 'top',
        left: 'right',
        right: 'left',
    };

/**
 * Alignments used as fallback on cross axis when there is not enough space for configured alignment
 */
const fallbackAlignments: Record<PopoverAlignment, PopoverAlignment[]> =
    {
        start: ['end', 'center'],
        end: ['start', 'center'],
        center: ['start', 'end'],
    };

/**
 * Builds single connected position for popover displayed at side with cross axis alignment
 * @param side - Side of trigger element at which popover is displayed
 * @param alignment - Alignment of popover on cross axis of side
 * @param offset - Gap in pixels between trigger and popover panel
 */
function getPopoverPosition(side: PopoverSide, alignment: PopoverAlignment, offset: number): ConnectedPosition
{
    if(side === 'top' || side === 'bottom')
    {
        const alignX: HorizontalConnectionPos = alignment;

        return {
            originX: alignX,
            originY: side,
            overlayX: alignX,
            overlayY: side === 'top' ? 'bottom' : 'top',
            offsetY: side === 'top' ? -offset : offset,
        };
    }

    const alignY: VerticalConnectionPos = alignment === 'start' ? 'top' : alignment === 'end' ? 'bottom' : 'center';

    return {
        originX: side === 'left' ? 'start' : 'end',
        originY: alignY,
        overlayX: side === 'left' ? 'end' : 'start',
        overlayY: alignY,
        offsetX: side === 'left' ? -offset : offset,
    };
}

/**
 * Builds connected positions for placement of popover, remaining alignments on cross axis and opposite side serve as flip fallbacks
 * @param placement - Placement of popover against trigger element
 * @param offset - Gap in pixels between trigger and popover panel
 */
export function getPopoverPositions(placement: PositionPlacement, offset: number): ConnectedPosition[]
{
    const[side, alignment] = placementSides[placement];
    const alignments = [alignment, ...fallbackAlignments[alignment]];

    return [
        ...alignments.map(align => getPopoverPosition(side, align, offset)),
        ...alignments.map(align => getPopoverPosition(oppositeSides[side], align, offset)),
    ];
}
