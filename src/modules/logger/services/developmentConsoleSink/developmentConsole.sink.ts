import {LoggerSink} from '../../interfaces';
import {LogLevel, LoggerOptions, MessageLog} from '../../types';
import {SinkType} from '../../decorators';

/**
 * Sink that is used for storing logs using browser developer console
 */
@SinkType()
export class DeveloperConsoleSink implements LoggerSink
{
    //######################### public methods - implementation of LoggerSink #########################

    /**
     * @inheritdoc
     */
    public log(options: LoggerOptions, loggerProperties: Record<string, unknown>, messageLog: MessageLog): void
    {
        const fullMessage = `%c${messageLog.buildMessage(options.messageTemplate ?? '{{messageLog}}', loggerProperties)}`;
        
        switch(messageLog.logLevel)
        {
            default:
            case LogLevel.Off:
            {
                break;
            }
            case LogLevel.Error:
            case LogLevel.Fatal:
            {
                this.writeLog(fullMessage, 'FF3131');

                break;
            }
            case LogLevel.Verbose:
            case LogLevel.Debug:
            {
                this.writeLog(fullMessage, '31A1FF');

                break;
            }
            case LogLevel.Information:
            {
                this.writeLog(fullMessage, 'ffffff');

                break;
            }
            case LogLevel.Warning:
            {
                this.writeLog(fullMessage, 'FFC531');

                break;
            }
        }
    }

    //######################### protected methods #########################

    /**
     * Writes message to log
     * @param fullMessage - Full message to be written
     * @param color - Color of message
     */
    protected writeLog(fullMessage: string, color: string): void
    {
        const index = fullMessage.indexOf('\n');

        if(index >= 0)
        {
            const firstLine = fullMessage.slice(0, index);
            const restLines = fullMessage.slice(index + 1);

            console.groupCollapsed(firstLine,  `color: #${color};`);
            console.log(`%c${restLines}`, `color: #${color};`);
            console.groupEnd();
        }
        else
        {
            console.log(fullMessage, `color: #${color};`);
        }
    }
}