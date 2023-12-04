import {Injectable, forwardRef} from '@angular/core';
import {Position, PositionResult, PositionOptions, PositionOffset, PositionPlacement, AutoUpdateOptions, POSITION, PositionOffsetString, PositionOffsets, TypeProvider} from '@anglr/common';
import {extend, isEmptyObject, isFunction, isJsObject, isNumber, nameof} from '@jscrpt/common';
import {computePosition, Placement, autoUpdate, Middleware, offset, flip} from '@floating-ui/dom';
import {Observable} from 'rxjs';

/**
 * Default options for `FloatingUiDomPosition` implementation
 */
const defaultOptions: PositionOptions =
{
    autoUpdate: false,
    flip: false,
    offset: nameof<typeof PositionOffset>('None') as PositionOffsetString,
    placement: PositionPlacement.TopStart,
};

/**
 * Service that is used for positioning two elements against each other, using floating-ui dom implementation
 */
@Injectable()
@TypeProvider({provide: POSITION, useClass: forwardRef(() => FloatingUiDomPosition)})
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
                                                             middleware: middlewares,
                                                         });

                    if(computedOptions.autoUpdate)
                    {
                        subscriber.next(
                        {
                            target,
                            dispose,
                            flip: !!result.middlewareData.flip && !isEmptyObject(result.middlewareData.flip),
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
                    flip: !!result.middlewareData.flip && !isEmptyObject(result.middlewareData.flip),
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
            middlewares.push(flip(
            {
                fallbackAxisSideDirection: 'start',
            }));
        }
    }

    /**
     * Sets offset middleware
     * @param middlewares - Array of middlewares that will set
     * @param options - Options that contains definition of offset
     */
    protected _setOffset(middlewares: Middleware[], options: PositionOptions): void
    {
        //no offset
        if(options.offset === PositionOffset[PositionOffset.None])
        {
            return;
        }

        if(options.offset === PositionOffset[PositionOffset.MouseEnter])
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
                options.placement = PositionPlacement.TopEnd;
            }
        }

        middlewares.push(offset(({elements, placement, x, y}) =>
        {
            //offset is function
            if(isFunction(options.offset))
            {
                return options.offset({elements, x, y});
            }

            const floating = elements.floating as Element;

            if(options.offset === PositionOffset[PositionOffset.MouseEnter] && options.mouseEvent)
            {
                const targetBoundingRect = (options.mouseEvent.target as HTMLElement).getBoundingClientRect();
                const floatingBoundingRect = (elements.floating as HTMLElement).getBoundingClientRect();

                return {
                    crossAxis: options.mouseEvent.x - targetBoundingRect.right + floatingBoundingRect.width
                };
            }

            const stringOffset = options.offset as PositionOffsetString|number;

            //offset is object
            if(isJsObject(options.offset))
            {
                return options.offset as PositionOffsets;
            }

            //offset is skidding number
            if(isNumber(stringOffset))
            {
                return {
                    crossAxis: stringOffset,
                };
            }

            let dimension: number;

            if(placement == 'bottom' || placement == 'bottom-start' || placement == 'bottom-end' ||
                placement == 'top' || placement == 'top-start' || placement == 'top-end')
            {
                dimension = floating.clientWidth;
            }
            else
            {
                dimension = floating.clientHeight;
            }

            switch(stringOffset)
            {
                default:
                {
                    dimension = 0;

                    break;
                }
                case PositionOffset[PositionOffset.Full]:
                {
                    break;
                }
                case PositionOffset[PositionOffset.Half]:
                {
                    dimension /= 2;

                    break;
                }
                case PositionOffset[PositionOffset.NegativeFull]:
                {
                    dimension *= -1;

                    break;
                }
                case PositionOffset[PositionOffset.NegativeHalf]:
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
