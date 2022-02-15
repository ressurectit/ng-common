import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ConsoleComponent} from '../components/console/console.component';
import {CONSOLE_COMPONENT_SINK, STRUCTURED_LOG_LOGGER, CONSOLE_COMPONENT_SINK_SERVICE_PROVIDER} from '../types/tokens';

/**
 * Module containing component Console (log)
 */
@NgModule(
{
    imports:
    [
        CommonModule
    ],
    declarations:
    [
        ConsoleComponent
    ],
    exports:
    [
        ConsoleComponent
    ]
})
export class ConsoleLogModule
{
    //######################### public methods #########################

    /**
     * Registers structured-log as logger service, with console component sink
     */
    public static forRoot(): ModuleWithProviders<ConsoleLogModule>
    {
        return {
            ngModule: ConsoleLogModule,
            providers:
            [
                CONSOLE_COMPONENT_SINK_SERVICE_PROVIDER,
                CONSOLE_COMPONENT_SINK,
                STRUCTURED_LOG_LOGGER
            ]
        };
    }
}