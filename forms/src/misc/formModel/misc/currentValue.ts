import {isBlank} from '@jscrpt/common';

/**
 * Gets current value from owner object when needed, use this method for obtaining args during customization
 * @param value - Value that is direct static value or instanceof CurrentValue
 * @returns 
 */
export function getCurrentValue<TValue>(value: CurrentValue<TValue>|TValue): TValue
{
    if(isBlank(value))
    {
        return null;
    }

    if(value instanceof CurrentValue)
    {
        return value.currentValue();
    }

    return value;
}

/**
 * Class used for obtaining current value from owner when needed
 */
export class CurrentValue<TValue = any>
{
    //######################### constructor #########################
    /**
     * Creates instance of CurrentValue
     * @param currentValue - Value function used for obtaining current value
     */
    constructor(public currentValue: () => TValue)
    {
    }
}