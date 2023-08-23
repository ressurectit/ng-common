import {inject} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {ConsoleComponentSinkOptions} from './consoleComponentSink.options';
import {ConsoleComponentLog, ConsoleComponentSinkData, LoggerSink} from '../../interfaces';
import {LogLevel, LoggerOptions, MessageLog} from '../../types';
import {SinkType} from '../../decorators';

/**
 * Sink that is used for storing logs in `ConsoleComponent`
 */
@SinkType()
export class ConsoleComponentSink implements LoggerSink, ConsoleComponentSinkData
{
    //######################### protected fields #########################

    /**
     * Array of current logs
     */
    protected currentLogs: ConsoleComponentLog[] = [];

    /**
     * Subject used for indicating logs change
     */
    protected logsChangeSubject: Subject<void> = new Subject<void>();

    /**
     * Options for this sink
     */
    protected options: ConsoleComponentSinkOptions = inject(ConsoleComponentSinkOptions);

    //######################### public properties - implementation of ConsoleComponentSink #########################

    /**
     * Occurs when logs change
     */
    public get logsChange(): Observable<void>
    {
        return this.logsChangeSubject.asObservable();
    }

    /**
     * Gets current logs
     */
    public get logs(): ConsoleComponentLog[]
    {
        return this.currentLogs;
    }

    //######################### public methods - implementation of ConsoleComponentSinkData #########################

    /**
     * Clears all current logs
     */
    public clear(): void
    {
        this.currentLogs = [];
        this.logsChangeSubject.next();
    }

    //######################### public methods - implementation of LoggerSink #########################

    /**
     * @inheritdoc
     */
    public log(options: LoggerOptions, loggerProperties: Record<string, unknown>, messageLog: MessageLog<Record<string, unknown>>): void
    {
        const fullMessage = `${messageLog.buildMessage(options.messageTemplate ?? '{{messageLog}}', loggerProperties)}`;

        this.currentLogs.push(
        {
            text: fullMessage,
            logLevel: LogLevel[messageLog.logLevel],
        });

        //TRIM LOGS
        if(this.currentLogs.length > this.options.maxLogsCount)
        {
            const removeCount = this.currentLogs.length - this.options.maxLogsCount;

            this.currentLogs.splice(0, removeCount);
        }

        this.logsChangeSubject.next();
    }
}