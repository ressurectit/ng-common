import {Provider, ValueProvider} from '@angular/core';
import {StringDictionary} from '@jscrpt/common';

import {VALIDATION_ERROR_MESSAGES} from './tokens';

/**
 * Provides validation error messages globally
 * @param messages - Object with messages to be provided
 */
export function provideValidatonErrorMessages(messages: StringDictionary): Provider
{
    return <ValueProvider>{
        provide: VALIDATION_ERROR_MESSAGES,
        useValue: messages,
    };
}
