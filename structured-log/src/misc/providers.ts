import {EnvironmentProviders, makeEnvironmentProviders} from '@angular/core';

import {CONSOLE_COMPONENT_SINK, CONSOLE_COMPONENT_SINK_SERVICE_PROVIDER} from '../types/tokens';

/**
 * Provides console component as sink for logger
 */
export function provideConsoleComponentSink(): EnvironmentProviders
{
    return makeEnvironmentProviders(
    [
        CONSOLE_COMPONENT_SINK_SERVICE_PROVIDER,
        CONSOLE_COMPONENT_SINK,
    ]);
}