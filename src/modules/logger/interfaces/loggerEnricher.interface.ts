import {MessageLog} from '../types';

/**
 * Logger enricher definition which allows enriching properties that can be used in log message template
 */
export interface LoggerEnricher<TProperties extends Record<string, unknown> = Record<string, unknown>>
{
    /**
     * Enriches properties
     * @param properties - Properties to be enriched
     * @param messageLog - Message log which data can also be used for enriching
     */
    enrich(properties: TProperties, messageLog: MessageLog): void;
}

/**
 * Type that represents logger enricher
 */
export interface LoggerEnricherType extends Function
{
    new(): LoggerEnricher;
}