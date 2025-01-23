import {Component, ChangeDetectionStrategy, Optional, OnInit, OnDestroy, ChangeDetectorRef, Input, ContentChild} from '@angular/core';
import {NgClass, NgTemplateOutlet} from '@angular/common';
import {FormControlStatus, FormGroup, FormGroupDirective, FormGroupName} from '@angular/forms';
import {KeysPipe} from '@anglr/common';
import {slideInOutTrigger} from '@anglr/animations';
import {Subscription} from 'rxjs';

import {ErrorMessageDirective, GroupErrorsTemplateDirective} from '../../directives';
import {WithErrorMessagePipe} from '../../pipes';

/**
 * Component used for rendering from group errors
 */
@Component(
{
    selector: 'form-group-errors',
    templateUrl: 'groupErrors.component.html',
    imports:
    [
        NgClass,
        KeysPipe,
        NgTemplateOutlet,
        WithErrorMessagePipe,
        ErrorMessageDirective,
    ],
    animations: [slideInOutTrigger],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupErrorsComponent implements OnInit, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Instance of currently used form group
     */
    protected _formGroup?: FormGroup;

    /**
     * Subscriptions created during initialization
     */
    protected _initSubscriptions: Subscription = new Subscription();

    /**
     * Last state of form control
     */
    protected _lastState?: FormControlStatus;

    //######################### public properties - template bindings #########################

    /**
     * Gets instance of currently used form group
     * @internal
     */
    public get formGroup(): FormGroup
    {
        return (this._formGroup ??= (this.formGroupDirective?.form ?? this.formGroupName?.control));
    }

    //######################### public properties - inputs #########################

    /**
     * Css classes that are applied to default rendered divs
     */
    @Input()
    public cssClass: string;

    //######################### public properties - children #########################

    /**
     * Custom template for rendering form group error
     */
    @ContentChild(GroupErrorsTemplateDirective)
    public template?: GroupErrorsTemplateDirective;

    //######################### constructor #########################
    constructor(@Optional() protected formGroupDirective: FormGroupDirective,
                @Optional() protected formGroupName: FormGroupName,
                protected _changeDetector: ChangeDetectorRef,)
    {
        if(!this.formGroupDirective && !this.formGroupName)
        {
            throw new Error('There is no parent formGroup or formGroupName directive');
        }
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this._initSubscriptions.add(this.formGroup.statusChanges.subscribe(state =>
        {
            if(this._lastState != state || state == 'INVALID')
            {
                this._lastState = state;
                this._changeDetector.detectChanges();
            }
        }));
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this._initSubscriptions?.unsubscribe();
        this._initSubscriptions = null;
    }
}