import {Pipe, PipeTransform, OnDestroy} from '@angular/core';
import {GlobalizationService} from '@anglr/common';
import {isBlank} from '@jscrpt/common';
import numeral from '@jscrpt/common/numeral';
import {Subscription} from 'rxjs';

/**
 * Pipe to transform numbers to regional formatting using numeraljs logic from @jscrpt/common/numeral.
 */
@Pipe({name: 'numeral', standalone: true})
export class NumeralPipe implements PipeTransform, OnDestroy
{
    //######################### private fields #########################
    
    /**
     * Subscription for globalization changes
     */
    private _globalizationChangeSubscription: Subscription|null;

    //######################### constructors #########################
    constructor(globalizationSvc: GlobalizationService)
    {
        numeral.locale(globalizationSvc.locale);

        this._globalizationChangeSubscription = globalizationSvc
            .localeChange
            .subscribe(() => numeral.locale(globalizationSvc.locale));
    }
 
    //######################### public methods #########################
    
    /**
     * Formats number value as slovak format string
     * @param value - Number to format
     * @param format - Format string (optional) 
     */   
    public transform(value: number|undefined|null, format: string): string
    {
        if(isBlank(value))
        {
            return '';
        }
        
        if(isNaN(value))
        {
            value = 0;
        }
        
        return numeral(value).format(format);
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this._globalizationChangeSubscription?.unsubscribe();
        this._globalizationChangeSubscription = null;
    }
}

