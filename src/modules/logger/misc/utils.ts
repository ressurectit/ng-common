import {isBlank} from '@jscrpt/common';

import {LogLevel, MessageLog} from '../types';
import {MinLogLevelGetter} from './types';
import {LoggerEnricher} from '../interfaces';

/**
 * Tests whether is logger sink enabled
 * @param minimumLogLevel - Minimum log level to be tested
 * @param messageLogLevel - Message log level
 */
export function loggerEnabled(minimumLogLevel: MinLogLevelGetter|null|undefined, messageLogLevel: LogLevel): boolean
{
    if(isBlank(minimumLogLevel))
    {
        return true;
    }

    return minimumLogLevel() <= messageLogLevel;
}

/**
 * Creates logger properties by using enrichers
 * @param messageLog - Message log to be used for creating enrichers
 */
export function useEnrichers(messageLog: MessageLog, enrichers: LoggerEnricher[]): Record<string, unknown>
{
    const properties: Record<string, unknown> = {};

    for(const enricher of enrichers)
    {
        enricher.enrich(properties, messageLog);
    }

    return properties;
}