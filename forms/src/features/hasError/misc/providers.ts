import {Provider, ValueProvider} from '@angular/core';
import {RecursivePartial} from '@jscrpt/common';

import {GroupHasErrorOptions, HasErrorOptions} from '../interfaces';
import {GROUP_HAS_ERROR_OPTIONS, HAS_ERROR_OPTIONS} from './tokens';

/**
 * Provides has error global options
 * @param options - Options to be provided
 */
export function provideHasErrorOptions(options: RecursivePartial<HasErrorOptions>): Provider
{
    return <ValueProvider>{
        provide: HAS_ERROR_OPTIONS,
        useValue: options,
    };
}

/**
 * Provides group has error global options
 * @param options - Options to be provided
 */
export function provideGroupHasErrorOptions(options: RecursivePartial<GroupHasErrorOptions>): Provider
{
    return <ValueProvider>{
        provide: GROUP_HAS_ERROR_OPTIONS,
        useValue: options,
    };
}
