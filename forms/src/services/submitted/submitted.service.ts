import {Injectable} from "@angular/core";
import {Subject, Observable} from "rxjs";

/**
 * Service used for handling submitted state of form
 */
@Injectable()
export class SubmittedService
{
    //######################### private fields #########################

    /**
     * Subject for indication when submitted changes
     */
    private _submittedChangeSubject: Subject<void> = new Subject<void>();

    /**
     * Indication whether was form submitted
     */
    private _submitted: boolean = false;

    //######################### public properties #########################

    /**
     * Gets indication whether was form submitted
     */
    public get submitted(): boolean
    {
        return this._submitted;
    }

    /**
     * Occurs when indication whether was form submitted changes
     */
    public get submittedChange(): Observable<void>
    {
        return this._submittedChangeSubject.asObservable();
    }

    //######################### public methods #########################

    /**
     * Sets submitted to true
     * @param submitted - If set to false, sets submitted to false
     */
    public setSubmitted(submitted: boolean = true)
    {
        if(this._submitted != submitted)
        {
            this._submitted = submitted;
            this._submittedChangeSubject.next();
        }
    }
}