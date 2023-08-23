import {MessageLog} from '../types';

/**
 * Definition of filter that is applied to logs coming into sinks
 */
export interface LoggerFilter
{
    /**
     * Filters out message logs which should not be logged if false is returned
     * @param loggerProperties - Logger global properties
     * @param messageLog - Instance of message log
     */
    <TLoggerProps = Record<string, unknown>, TProps extends Record<string, unknown> = Record<string, unknown>>(loggerProperties: TLoggerProps, messageLog: MessageLog<TProps>): boolean;
}