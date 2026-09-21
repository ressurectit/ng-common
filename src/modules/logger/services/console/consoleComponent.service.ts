import {Injectable, Signal, WritableSignal, inject, signal} from '@angular/core';

import {ConsoleComponentServiceOptions} from './consoleComponentService.options';
import {ConsoleComponentLog} from '../../interfaces';

/**
 * Sink that is used for storing logs in `ConsoleComponent`
 */
@Injectable({providedIn: 'root'})
export class ConsoleComponentService
{
    //######################### protected fields #########################

    /**
     * Array of current logs
     */
    protected currentLogs: WritableSignal<ConsoleComponentLog[]> = signal([]);

    /**
     * Options for this sink
     */
    protected options: ConsoleComponentServiceOptions = inject(ConsoleComponentServiceOptions);

    //######################### public properties #########################

    /**
     * Gets current logs
     */
    public get logs(): Signal<ConsoleComponentLog[]>
    {
        return this.currentLogs.asReadonly();
    }

    //######################### public methods #########################

    /**
     * Clears all current logs
     */
    public clear(): void
    {
        this.currentLogs.set([]);
    }

    /**
     * Logs log into service
     * @param log - Log to be stored
     */
    public log(log: ConsoleComponentLog): void
    {
        this.currentLogs.update(logs =>
        {
            logs.push(log);

            //TRIM LOGS
            if(logs.length > this.options.maxLogsCount)
            {
                const removeCount = logs.length - this.options.maxLogsCount;

                logs.splice(0, removeCount);
            }

            return [...logs];
        });
    }
}
