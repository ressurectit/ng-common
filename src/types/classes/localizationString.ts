/**
 * Special string holding parameters for localization
 */
export class LocalizationString extends String
{
    //######################### constructor #########################
    constructor(value: string, public interpolateParams?: Record<string, any>)
    {
        super(value);
    }
}
