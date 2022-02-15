import {Logger} from './logger.interface';

/**
 * Dummy service used as default logger interface doing nothing
 */
export class DummyLoggerService implements Logger
{
    //######################### public methods #########################

    /**
     * Logs an event with the LogEventLevel.fatal severity.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    fatal(messageTemplate: string, ...properties: any[]);

    /**
     * Logs an event with the LogEventLevel.fatal severity.
     * @param error - Error for the log event.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    fatal(error: Error, messageTemplate: string, ...properties: any[]);

    fatal(_errorOrMessageTemplate: any, ..._properties: any[]) 
    {
    }
    
    /**
     * Logs an event with the LogEventLevel.error severity.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    error(messageTemplate: string, ...properties: any[]);

    /**
     * Logs an event with the LogEventLevel.error severity.
     * @param error - Error for the log event.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    error(error: Error, messageTemplate: string, ...properties: any[]);

    error(_errorOrMessageTemplate: any, ..._properties: any[]) 
    {
    }
    
    /**
     * Logs an event with the LogEventLevel.warning severity.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    warn(messageTemplate: string, ...properties: any[]);

    /**
     * Logs an event with the LogEventLevel.warning severity.
     * @param error - Error for the log event.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    warn(error: Error, messageTemplate: string, ...properties: any[]);

    warn(_errorOrMessageTemplate: any, ..._properties: any[]) 
    {
    }
    
    /**
     * Logs an event with the LogEventLevel.information severity.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    info(messageTemplate: string, ...properties: any[]);

    /**
     * Logs an event with the LogEventLevel.information severity.
     * @param error - Error for the log event.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    info(error: Error, messageTemplate: string, ...properties: any[]);

    info(_errorOrMessageTemplate: any, ..._properties: any[]) 
    {
    }
    
    /**
     * Logs an event with the LogEventLevel.debug severity.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    debug(messageTemplate: string, ...properties: any[]);

    /**
     * Logs an event with the LogEventLevel.debug severity.
     * @param error - Error for the log event.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    debug(error: Error, messageTemplate: string, ...properties: any[]);

    debug(_errorOrMessageTemplate: any, ..._properties: any[]) 
    {
    }
    
    /**
     * Logs an event with the LogEventLevel.verbose severity.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    verbose(messageTemplate: string, ...properties: any[]);

    /**
     * Logs an event with the LogEventLevel.verbose severity.
     * @param error - Error for the log event.
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    verbose(error: Error, messageTemplate: string, ...properties: any[]);

    verbose(_errorOrMessageTemplate: any, ..._properties: any[]) 
    {
    }
}