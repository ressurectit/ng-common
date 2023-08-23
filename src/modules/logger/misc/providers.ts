import {EnvironmentProviders, FactoryProvider, makeEnvironmentProviders} from '@angular/core';
import {Action1} from '@jscrpt/common';

import {LoggerConfiguration} from '../interfaces';
import {LoggerConfigurationImpl} from '../types/loggerConfiguration';
import {LoggerOptions} from '../types';

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