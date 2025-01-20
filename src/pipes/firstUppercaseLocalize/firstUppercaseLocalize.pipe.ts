import {Pipe, PipeTransform, Inject, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

import {STRING_LOCALIZATION} from '../../types/tokens';
import {StringLocalization} from '../../services/stringLocalization';
import {LocalizePipe} from '../localize/localize.pipe';
import {FirstUppercasePipe} from '../firstUppercase/firstUppercase.pipe';

/**
 * Localize strings using 'StringLocalization' and converts first letter of text to uppercase
 */
@Pipe(
{
    name: 'firstUppercaseLocalize',
    pure: false,
})
export class FirstUppercaseLocalizePipe implements PipeTransform, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Localize pipe used for localizing string
     */
    protected localizePipe: LocalizePipe;

    /**
     * Pipe used for transforming first letter to uppercase
     */
    protected firstUppercasePipe: FirstUppercasePipe;

    /**
     * Subscription for changes of texts
     */
    protected subscription: Subscription|undefined|null;

    //######################### constructor #########################
    constructor(@Inject(STRING_LOCALIZATION) protected localizationSvc: StringLocalization,
                protected changeDetector: ChangeDetectorRef,)
    {
        this.localizePipe = new LocalizePipe(localizationSvc, changeDetector);
        this.firstUppercasePipe = new FirstUppercasePipe();
    }

    //######################### public methods - PipeTransform #########################

    /**
     * Localize strings using 'StringLocalization' and converts first letter of text to uppercase
     * @param value - Value to be converted
     * @param interpolateParams - Optional object storing interpolation parameters
     */
    public transform(value: string|undefined|null, interpolateParams?: Object): string
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