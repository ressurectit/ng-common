/**
 * Indicates that service class has properties values stored during webpack HMR 
 * 
 * @deprecated No replacement yet
 */
export function HmrServiceDataConstructor()
{
    return function(_target: {new(...args:any[]):{}}): any
    {
    }
};