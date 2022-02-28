import {Position, PositionResult, PositionOptions, PositionOffset, PositionPlacement} from '@anglr/common';
import {extend} from '@jscrpt/common';
import {computePosition, Placement, autoUpdate} from '@floating-ui/dom';

/**
 * Default options for `FloatingUiDomPosition` implementation
 */
const defaultOptions: PositionOptions =
{
    autoUpdate: false,
    flip: false,
    offset: PositionOffset.None,
    placement: PositionPlacement.Top
};

/**
 * Service that is used for positioning two elements against each other, using floating-ui dom implementation
 */
export class FloatingUiDomPosition implements Position
{
    //######################### public methods - implementation of Position #########################

    /**
     * @inheritdoc
     */
    public async placeElement(target: Element, source: Element, options?: Partial<PositionOptions>): Promise<PositionResult>
    {
        const computedOptions = extend({}, defaultOptions, options);

        const runComputation = async () =>
        {
            const result = await computePosition(source,
                                                 target as HTMLElement,
                                                 {
                                                     placement: this._getPlacement(computedOptions)
                                                 });

            if(computedOptions.autoUpdate && computedOptions.autoUpdateProcessor)
            {
                computedOptions.autoUpdateProcessor(
                {
                    target,
                    dispose: () => {},
                    x: result.x,
                    y: result.y
                });
            }

            return result;
        };

        const result = await runComputation();
        let dispose = () => {};

        if(computedOptions.autoUpdate)
        {
            dispose = autoUpdate(source, target as HTMLElement, runComputation);
        }

        return {
            target,
            dispose,
            x: result.x,
            y: result.y
        };
    }

    //######################### protected methods #########################

    /**
     * Gets floating ui placement from position placement
     * @param options - Options containing position placement
     */
    protected _getPlacement(options: PositionOptions): Placement
    {
        switch(options.placement)
        {
            default:
            // case PositionPlacement.Top:
            {
                return 'bottom';
            }
            case PositionPlacement.TopStart:
            {
                return 'top-start';
            }
            case PositionPlacement.TopEnd:
            {
                return 'top-end';
            }
            case PositionPlacement.Bottom:
            {
                return 'bottom';
            }
            case PositionPlacement.BottomStart:
            {
                return 'bottom-start';
            }
            case PositionPlacement.BottomEnd:
            {
                return 'bottom-end';
            }
            case PositionPlacement.Left:
            {
                return 'left';
            }
            case PositionPlacement.LeftStart:
            {
                return 'left-start';
            }
            case PositionPlacement.LeftEnd:
            {
                return 'left-end';
            }
            case PositionPlacement.Right:
            {
                return 'right';
            }
            case PositionPlacement.RightStart:
            {
                return 'right-start';
            }
            case PositionPlacement.RightEnd:
            {
                return 'right-end';
            }
        }
    }
}