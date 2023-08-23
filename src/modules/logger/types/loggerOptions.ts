import {Injectable} from '@angular/core';

import {LoggerEnricher, LoggerFilter, LoggerSink} from '../interfaces';
import {MinLogLevelGetter} from '../misc';
import {LogLevel} from './logLevel.enum';

/**
 * Options for logger that are used during logging
 */
@Injectable({providedIn: 'root'})
export class LoggerOptions
{
    //######################### public properties #########################

    /**
     * Minimal log level, that is used for logging, logs with lower log level are ignored
     */
    public minimumLogLevel: MinLogLevelGetter|undefined|null = () => LogLevel.Information;

    /**
     * Maximal allowed length of message, if it is exceeded it is trimmed
     */
    public messageLengthLimit: number|undefined|null = 500;

    /**
     * Logger message template that is used for creating message log, message log itself is inside `messageLog` property
     */
    public messageTemplate: string|undefined|null = '{{messageLog}}';

    /**
     * Array of enrichers that allows extending logger properties
     */
    public enrichers: LoggerEnricher[] = [];

    /**
     * Filter that filters out message logs
     */
    public filter: LoggerFilter|undefined|null = undefined;

    /**
     * Array of logger sinks that do actual logging
     */
    public loggerSinks: LoggerSink[] = [];
}