import {PositionResult} from './position.interface';

/**
 * Applies `PositionResult` to target element
 * @param result - Result of positioning process to be applied
 */
export function applyPositionResult(result: PositionResult<HTMLElement>): void
{
    Object.assign(result.target.style,
                  {
                      top: '0',
                      left: '0',
                      transform: `translate(${result.x}px, ${result.y}px)`,
                  });
}
