import {Pipe, PipeTransform, Inject, ChangeDetectorRef, OnInit, OnDestroy} from '@angular/core';
import {isBlank} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {STRING_LOCALIZATION} from '../../types/tokens';
import {StringLocalization} from '../../services/stringLocalization';

/**
 * Localize strings using 'StringLocalization'
 */
@Pipe(
{
    name: 'localize',
    pure: false,
})
export class LocalizePipe implements PipeTransform, OnInit, OnDestroy
{
    //######################### private fields #########################

    /**
     * Subscription for changes of texts
     */
    private _subscription: Subscription|undefined|null;

    //######################### constructor #########################
    constructor(@Inject(STRING_LOCALIZATION) private _localizationSvc: StringLocalization,
                private _changeDetector: ChangeDetectorRef,)
    {
    }

    //######################### public methods #########################

    /**
     * Gets localized string for specified key, interpolation might be used
     * @param key - Key to be localized
     * @param interpolateParams - Optional object storing interpolation parameters
     */
    public transform(key: string|undefined|null, interpolateParams?: Object): string
    {
        if(isBlank(key) || key === '')
        {
            return '';
        }

        return this._localizationSvc.get(key, interpolateParams);
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this._subscription = this._localizationSvc.textsChange.subscribe(() =>
        {
            this._changeDetector.markForCheck();
        });
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this._subscription?.unsubscribe();
        this._subscription = null;
    }
}