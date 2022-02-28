/**
 * Available positions for placement of target element against its source
 */
export enum PositionPlacement
{
    /**
     * Target is placed on the top (above) of source element in the middle of its width
     */
    Top,

    /**
     * Target is placed on the top (above) of source element at the start (left) of its width
     */
    TopStart,

    /**
     * Target is placed on the top (above) of source element at the end (right) of its width
     */
    TopEnd,

    /**
     * Target is placed on the left (before) of source element in the middle of its height
     */
    Left,

    /**
     * Target is placed on the left (before) of source element at the start (top) of its height
     */
    LeftStart,

    /**
     * Target is placed on the left (before) of source element at the end (bottom) of its height
     */
    LeftEnd,

    /**
     * Target is placed on the right (after) of source element in the middle of its height
     */
    Right,

    /**
     * Target is placed on the right (after) of source element at the start (top) of its height
     */
    RightStart,

    /**
     * Target is placed on the right (after) of source element at the end (bottom) of its height
     */
    RightEnd,

    /**
     * Target is placed on the bottom (below) of source element in the middle of its width
     */
    Bottom,

    /**
     * Target is placed on the bottom (below) of source element at the start (left) of its width
     */
    BottomStart,

    /**
     * Target is placed on the bottom (below) of source element at the end (right) of its width
     */
    BottomEnd
}

/**
 * Applied offset to position of target in cross axis relative to placement
 */
export enum PositionOffset
{
    /**
     * No offset applied
     */
    None,

    /**
     * Offset is calculated at the point where mouse enters source element
     */
    MouseEnter,

    /**
     * Positive offset equal to half of size of target
     */
    Half,

    /**
     * Negative offset equal to half of size of target
     */
    NegativeHalf,

    /**
     * Positive offset equal to full size of target
     */
    Full,

    /**
     * Negative offset equal to full size of target
     */
    NegativeFull
}