import {Injectable, inject} from '@angular/core';
import {Observable, Subject} from 'rxjs';

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
    protected currentLogs: ConsoleComponentLog[] = [];

    /**
     * Subject used for indicating logs change
     */
    protected logsChangeSubject: Subject<void> = new Subject<void>();

    /**
     * Options for this sink
     */
    protected options: ConsoleComponentServiceOptions = inject(ConsoleComponentServiceOptions);

    //######################### public properties #########################

    /**
     * Occurs when logs change
     */
    public get logsChange(): Observable<void>
    {
        return this.logsChangeSubject.asObservable();
    }

    /**
     * Gets current logs
     */
    public get logs(): ConsoleComponentLog[]
    {
        return this.currentLogs;
    }
    
    //######################### public methods #########################

    /**
     * Clears all current logs
     */
    public clear(): void
    {
        this.currentLogs = [];
        this.logsChangeSubject.next();
    }

    /**
     * Logs log into service
     * @param log - Log to be stored
     */
    public log(log: ConsoleComponentLog): void
    {
        this.currentLogs.push(log);

        //TRIM LOGS
        if(this.currentLogs.length > this.options.maxLogsCount)
        {
            const removeCount = this.currentLogs.length - this.options.maxLogsCount;

            this.currentLogs.splice(0, removeCount);
        }

        this.logsChangeSubject.next();
    }
}