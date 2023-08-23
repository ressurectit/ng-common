import {ClassProvider, EnvironmentProviders, FactoryProvider, Type, ValueProvider, makeEnvironmentProviders} from '@angular/core';
import {Action1} from '@jscrpt/common';

import {LoggerConfiguration, LoggerRestClient} from '../interfaces';
import {LoggerConfigurationImpl} from '../types/loggerConfiguration';
import {LoggerOptions} from '../types';
import {LOGGER_REST_CLIENT} from './tokens';
import {ConsoleComponentSinkOptions, RestSinkOptions} from '../services';

/**
 * Provides configuration for default built-in logger
 * @param configBuilder - Configuration builder that is used for configuring logger
 */
export function provideLoggerConfig(configBuilder: Action1<LoggerConfiguration>): EnvironmentProviders
{
    const config = new LoggerConfigurationImpl();

    configBuilder(config);

    return makeEnvironmentProviders(
    [
        <FactoryProvider>
        {
            provide: LoggerOptions,
            useFactory: config.buildOptions.bind(config),
        }
    ]);
}

/**
 * Provides logger rest client
 * @param type - Type that implements `LoggerRestClient`
 */
export function provideLoggerRestClient(type: Type<LoggerRestClient>): EnvironmentProviders
{
    return makeEnvironmentProviders(
    [
        <ClassProvider>
        {
            provide: LOGGER_REST_CLIENT,
            useClass: type,
        }
    ]);
}

/**
 * Provides `ConsoleComponentSinkOptions`
 * @param options - Value of options to be provided
 */
export function provideConsoleComponentSinkOptions(options: ConsoleComponentSinkOptions): EnvironmentProviders
{
    return makeEnvironmentProviders(
    [
        <ValueProvider>
        {
            provide: ConsoleComponentSinkOptions,
            useValue: options,
        }
    ]);
}

/**
 * Provides `RestSinkOptions`
 * @param options - Value of options to be provided
 */
export function provideRestSinkOptions(options: RestSinkOptions): EnvironmentProviders
{
    return makeEnvironmentProviders(
    [
        <ValueProvider>
        {
            provide: RestSinkOptions,
            useValue: options,
        }
    ]);
}
