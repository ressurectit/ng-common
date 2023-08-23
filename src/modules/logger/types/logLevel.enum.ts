/**
 * Log level for built in logger
 */
export enum LogLevel
{
    /**
     * Verbose logs used for tracking
     */
    Verbose = 0,

    /**
     * Debugging logs used for debugging
     */
    Debug = 1,

    /**
     * Informative log
     */
    Information = 2,

    /**
     * Warning log
     */
    Warning = 3,

    /**
     * Error log
     */
    Error = 4,

    /**
     * Fatal error log
     */
    Fatal = 5,

    /**
     * Logging is disabled
     */
    Off = 6,
}