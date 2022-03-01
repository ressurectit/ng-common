import {ClassProvider, Injectable} from '@angular/core';
import {Position, PositionResult, PositionOptions, PositionOffset, PositionPlacement, AutoUpdateOptions, POSITION} from '@anglr/common';
import {extend} from '@jscrpt/common';
import {computePosition, Placement, autoUpdate, Middleware, offset, flip} from '@floating-ui/dom';
import {Observable} from 'rxjs';

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
@Injectable()
export class FloatingUiDomPosition implements Position
{
    //######################### public methods - implementation of Position #########################

    /**
     * @inheritdoc
     */
    public placeElement(target: Element, source: Element, options?: Partial<PositionOptions>): Observable<PositionResult>
    {
        return new Observable(subscriber =>
        {
            (async () =>
            {
                const computedOptions = extend({}, defaultOptions, options);
                const middlewares: Middleware[] = [];

                this._setOffset(middlewares, computedOptions);
                this._setFlip(middlewares, computedOptions);

                const runComputation = async () =>
                {
                    const result = await computePosition(source,
                                                         target as HTMLElement,
                                                         {
                                                             placement: this._getPlacement(computedOptions),
                                                             middleware: middlewares
                                                         });

                    if(computedOptions.autoUpdate)
                    {
                        subscriber.next(
                        {
                            target,
                            dispose,
                            x: result.x,
                            y: result.y
                        });
                    }

                    return result;
                };
                
                let dispose = () => {};

                if(computedOptions.autoUpdate)
                {
                    let options: AutoUpdateOptions;

                    if(computedOptions.autoUpdate === true)
                    {
                        options =
                        {
                            ancestorResize: true,
                            ancestorScroll: true,
                            elementResize: true
                        };
                    }
                    else
                    {
                        options = computedOptions.autoUpdate;
                    }

                    dispose = autoUpdate(source,
                                         target as HTMLElement,
                                         runComputation,
                                         options);
                }

                const result = await runComputation();

                subscriber.next(
                {
                    target,
                    dispose,
                    x: result.x,
                    y: result.y
                });

                if(!computedOptions.autoUpdate)
                {
                    subscriber.complete();
                }
            })();
        });
    }

    //######################### protected methods #########################

    /**
     * Sets flip middleware
     * @param middlewares - Array of middlewares that will set
     * @param options - Options that contains definition of flip
     */
    protected _setFlip(middlewares: Middleware[], options: PositionOptions): void
    {
        if(options.flip)
        {
            middlewares.push(flip());
        }
    }

    /**
     * Sets offset middleware
     * @param middlewares - Array of middlewares that will set
     * @param options - Options that contains definition of offset
     */
    protected _setOffset(middlewares: Middleware[], options: PositionOptions): void
    {
        if(options.offset != PositionOffset.None)
        {
            if(options.offset == PositionOffset.MouseEnter)
            {
                //fallback if not supported placement used
                if(options.placement == PositionPlacement.Left ||
                   options.placement == PositionPlacement.LeftStart ||
                   options.placement == PositionPlacement.LeftEnd ||
                   options.placement == PositionPlacement.Right ||
                   options.placement == PositionPlacement.RightStart ||
                   options.placement == PositionPlacement.RightEnd ||
                   options.placement == PositionPlacement.Bottom ||
                   options.placement == PositionPlacement.BottomEnd ||
                   options.placement == PositionPlacement.Top ||
                   options.placement == PositionPlacement.TopEnd)
                {
                    options.placement = PositionPlacement.TopStart;
                }
            }

            middlewares.push(offset(({floating, placement}) =>
            {
                if(options.offset == PositionOffset.MouseEnter && options.mouseEvent)
                {
                    return {
                        crossAxis: options.mouseEvent.offsetX
                    };
                }

                let dimension: number;

                if(placement == 'bottom' || placement == 'bottom-start' || placement == 'bottom-end' ||
                   placement == 'top' || placement == 'top-start' || placement == 'top-end')
                {
                    dimension = floating.width;
                }
                else
                {
                    dimension = floating.height;
                }

                switch(options.offset)
                {
                    default:
                    {
                        dimension = 0;

                        break;
                    }
                    case PositionOffset.Full:
                    {
                        break;
                    }
                    case PositionOffset.Half:
                    {
                        dimension /= 2;

                        break;
                    }
                    case PositionOffset.NegativeFull:
                    {
                        dimension *= -1;

                        break;
                    }
                    case PositionOffset.NegativeHalf:
                    {
                        dimension *= -.5;

                        break;
                    }
                }

                return {
                    crossAxis: dimension
                };
            }));
        }
    }

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
                return 'top';
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

/**
 * Provider for floating ui position implementation
 */
export const FLOATING_UI_POSITION: ClassProvider =
{
    provide: POSITION,
    useClass: FloatingUiDomPosition
};