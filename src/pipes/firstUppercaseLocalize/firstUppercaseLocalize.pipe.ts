import {Pipe, PipeTransform, Inject, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

import {STRING_LOCALIZATION} from '../../types/tokens';
import {StringLocalization} from '../../services/stringLocalization';
import {LocalizeSAPipe} from '../localize/localize.pipe';
import {FirstUppercaseSAPipe} from '../firstUppercase/firstUppercase.pipe';

/**
 * Localize strings using 'StringLocalization' and converts first letter of text to uppercase
 */
@Pipe(
{
    name: 'firstUppercaseLocalize',
    standalone: true,
    pure: false,
})
export class FirstUppercaseLocalizeSAPipe implements PipeTransform, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Localize pipe used for localizing string
     */
    protected localizePipe: LocalizeSAPipe;

    /**
     * Pipe used for transforming first letter to uppercase
     */
    protected firstUppercasePipe: FirstUppercaseSAPipe;

    /**
     * Subscription for changes of texts
     */
    protected subscription: Subscription|undefined|null;

    //######################### constructor #########################
    constructor(@Inject(STRING_LOCALIZATION) protected localizationSvc: StringLocalization,
                protected changeDetector: ChangeDetectorRef,)
    {
        this.localizePipe = new LocalizeSAPipe(localizationSvc, changeDetector);
        this.firstUppercasePipe = new FirstUppercaseSAPipe();
    }

    //######################### public methods - PipeTransform #########################

    /**
     * Localize strings using 'StringLocalization' and converts first letter of text to uppercase
     * @param value - Value to be converted
     * @param interpolateParams - Optional object storing interpolation parameters
     */
    public transform(value: string|undefined|null, interpolateParams?: Object): string|undefined|null 
    {
        return this.firstUppercasePipe.transform(this.localizePipe.transform(value, interpolateParams));
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this.subscription = this.localizationSvc.textsChange.subscribe(() => this.changeDetector.markForCheck());
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.localizePipe.ngOnDestroy();
    }
}