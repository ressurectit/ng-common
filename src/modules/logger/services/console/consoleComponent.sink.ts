import {inject} from '@angular/core';

import {LoggerSink} from '../../interfaces';
import {LogLevel, LoggerOptions, MessageLog} from '../../types';
import {SinkType} from '../../decorators';
import {ConsoleComponentService} from './consoleComponent.service';

/**
 * Sink that is used for storing logs in `ConsoleComponent`
 */
@SinkType()
export class ConsoleComponentSink implements LoggerSink
{
    //######################### protected fields #########################

    /**
     * Options for this sink
     */
    protected consoleComponentSvc: ConsoleComponentService = inject(ConsoleComponentService);

    //######################### public methods - implementation of LoggerSink #########################

    /**
     * @inheritdoc
     */
    public log(options: LoggerOptions, loggerProperties: Record<string, unknown>, messageLog: MessageLog<Record<string, unknown>>): void
    {
        const fullMessage = `${messageLog.buildMessage(options.messageTemplate ?? '{{messageLog}}', loggerProperties)}`;

        this.consoleComponentSvc.log(
        {
            text: fullMessage,
            logLevel: LogLevel[messageLog.logLevel],
        });
    }
}