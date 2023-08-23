import {LoggerEnricher} from '../../interfaces';
import {MessageLog} from '../../types';

const TIMESTAMP = 'timestamp';

/**
 * Enricher used for adding timestamp as iso datetime with current date time
 */
export class TimestampEnricher implements LoggerEnricher
{
    //######################### public methods - implementation of LoggerEnricher #########################

    /**
     * @inheritdoc
     */
    public enrich(properties: Record<string, unknown>, messageLog: MessageLog<Record<string, unknown>>): void
    {
        properties[TIMESTAMP] = messageLog.timestamp;
    }
}