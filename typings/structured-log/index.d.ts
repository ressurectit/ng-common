export as namespace StructuredLog;

export declare class BatchedSink implements Sink 
{
    protected durableStorageKey: string;
    protected options: BatchedSinkOptions;
    protected innerSink: Sink;
    protected batchedEvents: LogEvent[];
    private batchTimeout;
    private batchKey;
    constructor(innerSink?: Sink, options?: BatchedSinkOptions);
    emit(events: LogEvent[]): LogEvent[];
    flush(): Promise<any>;
    protected emitCore(events: LogEvent[]): any;
    protected flushCore(): Promise<any>;
    protected cycleBatch(): void;
    private storeEvents;
}

export declare interface BatchedSinkOptions {
    /**
     * Maximum number of events to be sent in a single batch.
     */
    maxSize?: number;
    /**
     * Number of seconds to wait between checking for batches.
     */
    period?: number;
    /**
     * {Storage} instance to be used for durable storage of log events.
     */
    durableStore?: Storage;
}

export declare function configure(): LoggerConfiguration;

export declare interface ConsoleProxy {
    error(message?: any, ...properties: any[]): any;
    warn(message?: any, ...properties: any[]): any;
    info(message?: any, ...properties: any[]): any;
    debug(message?: any, ...properties: any[]): any;
    log(message?: any, ...properties: any[]): any;
}

export declare class ConsoleSink implements Sink 
{
    private options;
    private console;
    constructor(options?: ConsoleSinkOptions);
    emit(events: LogEvent[]): void;
    flush(): Promise<{}>;
    private writeToConsole;
}

export declare interface ConsoleSinkOptions {
    console?: any;
    includeTimestamps?: boolean;
    includeProperties?: boolean;
    restrictedToMinimumLevel?: LogEventLevel;
}

export declare const defaultBatchedSinkOptions: BatchedSinkOptions;

/**
 * Allows dynamic control of the logging level.
 */
export declare class DynamicLevelSwitch implements LogEventLevelSwitch<Promise<any>> 
{
    private minLevel;
    /**
     * Gets or sets a delegate that can be called when the pipeline needs to be flushed.
     * This should generally not be modified, as it will be provided by the pipeline stage.
     */
    flushDelegate: () => Promise<any>;
    fatal(): Promise<LogEventLevel>;
    error(): Promise<LogEventLevel>;
    warning(): Promise<LogEventLevel>;
    information(): Promise<LogEventLevel>;
    debug(): Promise<LogEventLevel>;
    verbose(): Promise<LogEventLevel>;
    off(): Promise<LogEventLevel>;
    isEnabled(level: LogEventLevel): boolean;
}

export declare class DynamicLevelSwitchStage extends FilterStage 
{
    private dynamicLevelSwitch;
    /**
     * Sets a delegate that can be called when the pipeline needs to be flushed.
     */
    setFlushDelegate(flushDelegate: () => Promise<any>): void;
    constructor(dynamicLevelSwitch: DynamicLevelSwitch);
}

export declare class EnrichStage implements PipelineStage 
{
    private enricher;
    constructor(enricher: Object | ObjectFactory);
    emit(events: LogEvent[]): LogEvent[];
    flush(): Promise<any>;
}

export declare class FilterStage implements PipelineStage 
{
    private predicate;
    constructor(predicate: (e: LogEvent) => boolean);
    emit(events: LogEvent[]): LogEvent[];
    flush(): Promise<any>;
}

/**
 * Checks if a log event level includes the target log event level.
 * @param {LogEventLevel} level The level to check.
 * @param {LogEventLevel} target The target level.
 * @returns True if the checked level contains the target level, or if the checked level is undefined.
 */
export declare function isEnabled(level: LogEventLevel, target: LogEventLevel): boolean;

/**
 * Represents a log event.
 */
export declare class LogEvent 
{
    /**
     * Creates a new log event instance.
     */
    constructor(timestamp: string, level: LogEventLevel, messageTemplate: MessageTemplate, properties?: Object, error?: Error);
    /**
     * Gets or sets an ISO 8601-formatted date string for when this event occurred.
     * @example YYYY-MM-DDTHH:mm:ss.sssZ
     */
    timestamp: string;
    /**
     * Gets or sets the severity level of this event.
     */
    level: LogEventLevel;
    /**
     * Gets or sets the message template instance of this event.
     */
    messageTemplate: MessageTemplate;
    /**
     * Gets or sets an object containing the captured properties of this event.
     */
    properties: Object;
    /**
     * Gets or sets an error associated with this event.
     */
    error: Error;
}

/**
 * Represents the severity level of a log event.
 */
export declare enum LogEventLevel {
    off = 0,
    fatal = 1,
    error = 3,
    warning = 7,
    information = 15,
    debug = 31,
    verbose = 63
}

/**
 * Represents an object that can switch between log levels.
 */
export declare interface LogEventLevelSwitch<T> {
    fatal(): T;
    error(): T;
    warning(): T;
    information(): T;
    debug(): T;
    verbose(): T;
}

/**
 * Logs events.
 */
export declare class Logger implements Sink 
{
    private pipeline;
    suppressErrors: boolean;
    /**
     * Creates a new logger instance using the specified pipeline.
     */
    constructor(pipeline: Pipeline, suppressErrors?: boolean);
    /**
     * Logs an event with the {LogEventLevel.fatal} severity.
     * @param {string} messageTemplate Message template for the log event.
     * @param {any[]} properties Properties that can be used to render the message template.
     */
    fatal(messageTemplate: string, ...properties: any[]): any;
    /**
     * Logs an event with the {LogEventLevel.fatal} severity.
     * @param {Error} error Error for the log event.
     * @param {string} messageTemplate Message template for the log event.
     * @param {any[]} properties Properties that can be used to render the message template.
     */
    fatal(error: Error, messageTemplate: string, ...properties: any[]): any;
    /**
     * Logs an event with the {LogEventLevel.error} severity.
     * @param {string} messageTemplate Message template for the log event.
     * @param {any[]} properties Properties that can be used to render the message template.
     */
    error(messageTemplate: string, ...properties: any[]): any;
    /**
     * Logs an event with the {LogEventLevel.error} severity.
     * @param {Error} error Error for the log event.
     * @param {string} messageTemplate Message template for the log event.
     * @param {any[]} properties Properties that can be used to render the message template.
     */
    error(error: Error, messageTemplate: string, ...properties: any[]): any;
    /**
     * Logs an event with the {LogEventLevel.warning} severity.
     * @param {string} messageTemplate Message template for the log event.
     * @param {any[]} properties Properties that can be used to render the message template.
     */
    warn(messageTemplate: string, ...properties: any[]): any;
    /**
     * Logs an event with the {LogEventLevel.warning} severity.
     * @param {Error} error Error for the log event.
     * @param {string} messageTemplate Message template for the log event.
     * @param {any[]} properties Properties that can be used to render the message template.
     */
    warn(error: Error, messageTemplate: string, ...properties: any[]): any;
    /**
     * Logs an event with the {LogEventLevel.information} severity.
     * @param {string} messageTemplate Message template for the log event.
     * @param {any[]} properties Properties that can be used to render the message template.
     */
    info(messageTemplate: string, ...properties: any[]): any;
    /**
     * Logs an event with the {LogEventLevel.information} severity.
     * @param {Error} error Error for the log event.
     * @param {string} messageTemplate Message template for the log event.
     * @param {any[]} properties Properties that can be used to render the message template.
     */
    info(error: Error, messageTemplate: string, ...properties: any[]): any;
    /**
     * Logs an event with the {LogEventLevel.debug} severity.
     * @param {string} messageTemplate Message template for the log event.
     * @param {any[]} properties Properties that can be used to render the message template.
     */
    debug(messageTemplate: string, ...properties: any[]): any;
    /**
     * Logs an event with the {LogEventLevel.debug} severity.
     * @param {Error} error Error for the log event.
     * @param {string} messageTemplate Message template for the log event.
     * @param {any[]} properties Properties that can be used to render the message template.
     */
    debug(error: Error, messageTemplate: string, ...properties: any[]): any;
    /**
     * Logs an event with the {LogEventLevel.verbose} severity.
     * @param {string} messageTemplate Message template for the log event.
     * @param {any[]} properties Properties that can be used to render the message template.
     */
    verbose(messageTemplate: string, ...properties: any[]): any;
    /**
     * Logs an event with the {LogEventLevel.verbose} severity.
     * @param {Error} error Error for the log event.
     * @param {string} messageTemplate Message template for the log event.
     * @param {any[]} properties Properties that can be used to render the message template.
     */
    verbose(error: Error, messageTemplate: string, ...properties: any[]): any;
    /**
     * Flushes the pipeline of this logger.
     * @returns A {Promise<any>} that will resolve when the pipeline has been flushed.
     */
    flush(): Promise<any>;
    /**
     * Emits events through this logger's pipeline.
     */
    emit(events: LogEvent[]): LogEvent[];
    private write;
}

/**
 * Configures pipelines for new logger instances.
 */
export declare class LoggerConfiguration 
{
    private pipeline;
    private _suppressErrors;
    constructor();
    /**
     * Adds a sink to the pipeline.
     * @param {Sink} sink The sink to add.
     */
    writeTo(sink: Sink): LoggerConfiguration;
    /**
     * Sets the minimum level for any subsequent stages in the pipeline.
     */
    minLevel: MinLevel;
    /**
     * Adds a filter to the pipeline.
     * @param {(e: LogEvent) => boolean} predicate Filter predicate to use.
     */
    filter(predicate: (e: LogEvent) => boolean): LoggerConfiguration;
    /**
     * Adds an enricher to the pipeline.
     */
    enrich(enricher: Object | ObjectFactory): LoggerConfiguration;
    /**
     * Enable or disable error suppression.
     */
    suppressErrors(suppress?: boolean): LoggerConfiguration;
    /**
     * Creates a new logger instance based on this configuration.
     */
    create(): Logger;
}

/**
 * Represents a message template that can be rendered into a log message.
 */
export declare class MessageTemplate 
{
    /**
     * Gets or sets the raw message template of this instance.
     */
    raw: string;
    private tokens;
    /**
     * Creates a new MessageTemplate instance with the given template.
     */
    constructor(messageTemplate: string);
    /**
     * Renders this template using the given properties.
     * @param {Object} properties Object containing the properties.
     * @returns Rendered message.
     */
    render(properties?: Object): string;
    /**
     * Binds the given set of args to their matching tokens.
     * @param {any} positionalArgs Arguments.
     * @returns Object containing the properties.
     */
    bindProperties(positionalArgs: any): Object;
    private tokenize;
    private toText;
    private capture;
}

export declare interface MinLevel extends LogEventLevelSwitch<LoggerConfiguration> {
    (levelOrSwitch: LogEventLevel | string | number | DynamicLevelSwitch): LoggerConfiguration;
}

export declare type ObjectFactory = (properties?: Object) => Object;

export declare class Pipeline 
{
    private stages;
    private eventQueue;
    private flushInProgress;
    private flushPromise;
    constructor();
    /**
     * Adds a stage to the end of the pipeline.
     * @param {PipelineStage} stage The pipeline stage to add.
     */
    addStage(stage: PipelineStage): void;
    /**
     * Emits events through the pipeline. If a flush is currently in progress, the events will be queued and will been
     * sent through the pipeline once the flush is complete.
     * @param {LogEvent[]} events The events to emit.
     */
    emit(events: LogEvent[]): Promise<any>;
    /**
     * Flushes events through the pipeline.
     * @returns A {Promise<any>} that resolves when all events have been flushed and the pipeline can accept new events.
     */
    flush(): Promise<any>;
}

export declare interface PipelineStage {
    emit(events: LogEvent[]): LogEvent[];
    flush(): Promise<any>;
}

export declare interface Sink {
    emit(events: LogEvent[]): any;
    flush(): Promise<any>;
}

export declare class SinkStage implements PipelineStage 
{
    private sink;
    constructor(sink: Sink);
    emit(events: LogEvent[]): LogEvent[];
    flush(): Promise<any>;
}
