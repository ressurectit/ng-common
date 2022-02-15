/**
 * Indicates that property value of service is stored during webpack HMR 
 * 
 * @deprecated No replacement yet
 */
export function HmrServiceData()
{
    return function(_target: any, _propertyKey: string)
    {
    }
};