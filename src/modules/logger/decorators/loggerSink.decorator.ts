import {LoggerSinkType as LoggerSinkTyp} from '../interfaces/loggerSink.interface';

const loggerSinkTypeSymbol = Symbol('loggerSinkTypeSymbol');

/**
 * Type that contains flag whether is type logger sink
 */
interface LoggerSinkType
{
    /**
     * Flag indicating that type is logger sink
     */
    [loggerSinkTypeSymbol]?: boolean;
}

/**
 * Tests whether is type marked as logger sink
 * @param type - Type that will be marked
 */
export function isLoggerSinkType(type: unknown): type is LoggerSinkTyp
{
    const loggerSinkType = type as LoggerSinkType;

    return !!loggerSinkType[loggerSinkTypeSymbol];
}

/**
 * Marks type as Logger sink type
 */
export function SinkType(): ClassDecorator
{
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function<TFunction extends Function> (target: TFunction): TFunction
    {
        const loggerSinkType = target as LoggerSinkType;
    
        if(!loggerSinkType[loggerSinkTypeSymbol])
        {
            Object.defineProperty(loggerSinkType, loggerSinkTypeSymbol,
            {
                value: true,
                writable: false,
                enumerable: false,
                configurable: false,
            });
        }

        return target;
    };
}