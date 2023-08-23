import {LoggerEnricher} from '../../interfaces';
import {LogLevel, MessageLog} from '../../types';

const LOG_LEVEL = 'logLevel';
const LOG_LEVEL_SHORT = 'logLevelShort';

/**
 * Enricher used for adding logLevel and logLevelShort properties
 */
export class LogLevelEnricher implements LoggerEnricher
{
    //######################### public methods - implementation of LoggerEnricher #########################

    /**
     * @inheritdoc
     */
    public enrich(properties: Record<string, unknown>, messageLog: MessageLog<Record<string, unknown>>): void
    {
        properties[LOG_LEVEL] = LogLevel[messageLog.logLevel];
        
        switch(messageLog.logLevel)
        {
            case LogLevel.Debug:
            {
                properties[LOG_LEVEL_SHORT] = 'DBG';

                break;
            }
            case LogLevel.Verbose:
            {
                properties[LOG_LEVEL_SHORT] = 'VER';

                break;
            }
            case LogLevel.Information:
            {
                properties[LOG_LEVEL_SHORT] = 'INF';

                break;
            }
            case LogLevel.Error:
            {
                properties[LOG_LEVEL_SHORT] = 'ERR';

                break;
            }
            case LogLevel.Fatal:
            {
                properties[LOG_LEVEL_SHORT] = 'FTL';

                break;
            }
            case LogLevel.Warning:
            {
                properties[LOG_LEVEL_SHORT] = 'WRN';

                break;
            }
            case LogLevel.Off:
            {
                break;
            }
        }
    }

}