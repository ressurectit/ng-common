import {InjectionToken} from '@angular/core';
import {RecursivePartial} from '@jscrpt/common';

import {GroupHasErrorOptions, HasErrorOptions} from '../interfaces';

/**
 * Injection token used for injecting global `HasErrorOptions`
 */
export const HAS_ERROR_OPTIONS: InjectionToken<RecursivePartial<HasErrorOptions>> = new InjectionToken<RecursivePartial<HasErrorOptions>>('HAS_ERROR_OPTIONS');

/**
 * Injection token used for injecting global `GroupHasErrorOptions`
 */
export const GROUP_HAS_ERROR_OPTIONS: InjectionToken<RecursivePartial<GroupHasErrorOptions>> = new InjectionToken<RecursivePartial<GroupHasErrorOptions>>('GROUP_HAS_ERROR_OPTIONS');
