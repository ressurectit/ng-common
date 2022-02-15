import {LogEventLevel} from 'structured-log';

/**
 * Transforms property to text
 * @param property - Property to be transformed to text
 */
export function toText(property: any): string
{
    if (typeof property === 'undefined')
    {
        return 'undefined';
    }

    if (property === null)
    {
        return 'null';
    }

    if (typeof property === 'string')
    {
        return property;
    }

    if (typeof property === 'number')
    {
        return property.toString();
    }

    if (typeof property === 'boolean')
    {
        return property.toString();
    }

    if (typeof property.toISOString === 'function')
    {
        return property.toISOString();
    }

    if (typeof property === 'object')
    {
        let s = JSON.stringify(property, null, 4);

        return s;
    }

    return property.toString();
};

/**
 * Checks if a log event level includes the target log event level.
 * @param level - The level to check.
 * @param target - The target level.
 * @returns True if the checked level contains the target level, or if the checked level is undefined.
 */
export function isEnabled(level: LogEventLevel, target: LogEventLevel): boolean
{
    return typeof level === 'undefined' || (level & target) === target;
}