import {Injectable} from "@angular/core";
import {Subject, Observable} from "rxjs";

import {StringLocalization} from "./stringLocalization.interface";

/**
 * Default implementation of StringLocalization, which uses 'key' as localization text
 */
@Injectable()
export class NoStringLocalizationService implements StringLocalization
{
    //######################### private fields #########################

    /**
     * Subject used for emitting when indication that locale has changes and strings should be obtained again, because they have changed
     */
    private _textsChangeSubject: Subject<void> = new Subject<void>();

    //######################### public properties - implementation of StringLocalization #########################

    /**
     * Occurs when indication that locale has changes and strings should be obtained again, because they have changed
     */
    public get textsChange(): Observable<void>
    {
        return this._textsChangeSubject.asObservable();
    }

    //######################### public methods - implementation of StringLocalization #########################

    /**
     * Gets localized string for specified key, interpolation might be used
     * @param key - Key to be localized
     * @param interpolateParams - Optional object storing interpolation parameters
     */
    public get(key: string, interpolateParams?: Object): string
    {
        if(!interpolateParams)
        {
            return key;
        }

        Object.keys(interpolateParams).forEach(prop =>
        {
            key = key.replace(new RegExp(`{{${prop}}}`, 'g'), interpolateParams[prop]);
        });

        return key;
    }
}