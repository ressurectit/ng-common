import {formatString} from '@jscrpt/common';

import {LogLevel} from './logLevel.enum';

/**
 * Message log that contains all information that are used for displaying log
 */
export class MessageLog<TProperties extends Record<string, unknown> = Record<string, unknown>>
{
    //######################### public properties #########################

    /**
     * Message that is used as message template for log itself
     */
    public readonly message: string;

    /**
     * Log level of current message log
     */
    public readonly logLevel: LogLevel;

    /**
     * Properties that are "replaced" inside message
     */
    public readonly properties: TProperties;

    //######################### constructor #########################
    constructor(message: string, logLevel: LogLevel, properties: TProperties)
    {
        this.message = message;
        this.logLevel = logLevel;
        this.properties = properties;
    }

    //######################### public methods #########################

    /**
     * Builds message that will be logged in logger sink
     * @param messageTemplate - Global message template for log
     * @param loggerProperties - Properties that are coming from logger itself
     */
    public buildMessage(messageTemplate: string, loggerProperties: Record<string, unknown>): string
    {
        const properties = {...this.properties};

        for(const property in loggerProperties)
        {
            //only add new properties, do not replace existing ones
            if(!(property in properties))
            {
                (properties as Record<string, unknown>)[property] = loggerProperties[property];
            }
        }

        const messageLog = formatString(this.message, properties);
        loggerProperties.messageLog = messageLog;
        
        return formatString(messageTemplate, loggerProperties);
    }
}