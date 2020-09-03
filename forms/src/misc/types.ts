import {InjectionToken} from "@angular/core";
import {StringDictionary} from "@jscrpt/common";

/**
 * Injection token containing validation error messages
 */
export const VALIDATION_ERROR_MESSAGES: InjectionToken<StringDictionary> = new InjectionToken<StringDictionary>('VALIDATION_ERROR_MESSAGES');