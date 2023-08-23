import {InjectionToken} from '@angular/core';

import {LoggerRestClient} from '../interfaces';

/**
 * Injection token for obtaining rest client for rest sink
 */
export const LOGGER_REST_CLIENT: InjectionToken<LoggerRestClient> = new InjectionToken<LoggerRestClient>('LOGGER_REST_CLIENT');
