import {InjectionToken, Provider, ExistingProvider, ClassProvider, FactoryProvider} from '@angular/core';
import {Sink} from 'structured-log';

import {ConsoleComponentSink, LoggerRestClient} from './logger.interface';
import {ConsoleComponentSinkService} from '../services/console/consoleComponentSink.service';
import {ConsoleSinkConfigService} from '../services/console/consoleSinkConfig.service';
import {RestSinkService} from '../services/rest/restSink.service';
import {DeveloperConsoleSinkService} from '../services/developerConsole/developerConsoleSink.service';

/**
 * Factory method for `ConsoleComponentSink`
 */
export function consoleComponentSinkFactory(configSvc: ConsoleSinkConfigService): ConsoleComponentSinkService
{
    return new ConsoleComponentSinkService(configSvc);
}

/**
 * Injection token for obtaining loggers sinks
 */
export const LOGGER_SINKS: InjectionToken<Sink[]> = new InjectionToken<Sink[]>('LOGGER_SINK');

/**
 * Injection token for obtaining sink service for `ConsoleComponent`
 */
export const CONSOLE_COMPONENT_SINK_SERVICE: InjectionToken<ConsoleComponentSink> = new InjectionToken<ConsoleComponentSink>('CONSOLE_COMPONENT_SINK_SERVICE');

/**
 * Injection token for obtaining rest client for rest sink
 */
export const LOGGER_REST_CLIENT: InjectionToken<LoggerRestClient> = new InjectionToken<LoggerRestClient>('LOGGER_REST_CLIENT');

/**
 * Provider for `ConsoleComponentSinkService` for logger
 */
export const CONSOLE_COMPONENT_SINK_SERVICE_PROVIDER: Provider =
<FactoryProvider>
{
    provide: CONSOLE_COMPONENT_SINK_SERVICE,
    useFactory: consoleComponentSinkFactory,
    deps: [ConsoleSinkConfigService]
};

/**
 * Provider for `ConsoleComponentSink` for logger
 */
export const CONSOLE_COMPONENT_SINK: Provider =
<ExistingProvider>
{
    provide: LOGGER_SINKS,
    useExisting: CONSOLE_COMPONENT_SINK_SERVICE,
    multi: true
};

/**
 * Provider for `RestSinkService` for logger
 */
export const REST_SINK: Provider =
<ClassProvider>
{
    provide: LOGGER_SINKS,
    useClass: RestSinkService,
    multi: true
};

/**
 * Provider for `DeveloperConsoleSinkService` for logger
 */
export const DEVELOPER_CONSOLE_SINK: Provider =
<ClassProvider>
{
    provide: LOGGER_SINKS,
    useClass: DeveloperConsoleSinkService,
    multi: true
};
