/**
 * Interface for general logger
 */
export interface Logger
{
    //######################### public methods #########################

    /**
     * Logs an event with the log level fatal severity .
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    fatal(messageTemplate: string, properties?: Record<string, unknown>): void;

    /**
     * Logs an event with the log level error severity .
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    error(messageTemplate: string, properties?: Record<string, unknown>): void;

    /**
     * Logs an event with the log level warn severity .
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    warn(messageTemplate: string, properties?: Record<string, unknown>): void;

    /**
     * Logs an event with the log level info severity .
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    info(messageTemplate: string, properties?: Record<string, unknown>): void;

    /**
     * Logs an event with the log level debug severity .
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    debug(messageTemplate: string, properties?: Record<string, unknown>): void;

    /**
     * Logs an event with the log level verbose severity .
     * @param messageTemplate - Message template for the log event.
     * @param properties - Properties that can be used to render the message template.
     */
    verbose(messageTemplate: string, properties?: Record<string, unknown>): void;
}
