import {InjectionToken} from '@angular/core';
import {StringDictionary} from '@jscrpt/common';

import {ValidationErrorRendererFactoryOptions} from '../services/validationErrorRenderer/validationErrorRenderer.interface';

/**
 * Injection token containing validation error messages
 */
export const VALIDATION_ERROR_MESSAGES: InjectionToken<StringDictionary> = new InjectionToken<StringDictionary>('VALIDATION_ERROR_MESSAGES');

/**
 * Injection token for injecting array of ignored error names when automatically processed
 */
export const IGNORED_VALIDATION_ERRORS: InjectionToken<string[]> = new InjectionToken<string[]>('IGNORED_VALIDATION_ERRORS', {providedIn: 'root', factory: () => ['actual']});

/**
 * Injection token used for injecting global options for ValidationErrorRendererFactory
 */
export const VALIDATION_ERROR_RENDERER_FACTORY_OPTIONS: InjectionToken<ValidationErrorRendererFactoryOptions> = new InjectionToken<ValidationErrorRendererFactoryOptions>('VALIDATION_ERROR_RENDERER_FACTORY_OPTIONS');
