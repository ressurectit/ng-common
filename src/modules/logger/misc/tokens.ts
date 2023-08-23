import {InjectionToken} from '@angular/core';

import {ConsoleComponentSink} from '../services/console/consoleComponent.sink';
import {ConsoleComponentSinkData, LoggerRestClient} from '../interfaces';

/**
 * Injection token for obtaining sink service for `ConsoleComponent`
 */
export const CONSOLE_COMPONENT_SINK_SERVICE: InjectionToken<ConsoleComponentSinkData> = new InjectionToken<ConsoleComponentSinkData>('CONSOLE_COMPONENT_SINK_SERVICE', {providedIn: 'root', factory: () => new ConsoleComponentSink()});

/**
 * Injection token for obtaining rest client for rest sink
 */
export const LOGGER_REST_CLIENT: InjectionToken<LoggerRestClient> = new InjectionToken<LoggerRestClient>('LOGGER_REST_CLIENT');
