import {Directive, Optional, SkipSelf, OnInit, OnDestroy, Inject, Input, Injector, ViewContainerRef, AfterViewInit, Type, TemplateRef} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {FormControlDirective, FormControlName, FormControl, NgModel, PristineChangeEvent} from '@angular/forms';
import {StringLocalization, STRING_LOCALIZATION} from '@anglr/common';
import {generateId, BindThis, StringDictionary} from '@jscrpt/common';
import {Subscription, filter, skip} from 'rxjs';

import {ValidationErrorRendererFactory} from '../../services/validationErrorRenderer/validationErrorRenderer.service';
import {ValidationErrorRenderer, ValidationErrorsComponent, ValidationErrorsRendererOptions, LegacyValidationErrorsTemplateContext} from '../../services/validationErrorRenderer/validationErrorRenderer.interface';
import {GroupHasErrorDirective} from '../groupHasError/groupHasError.directive';
import {ValidationErrorsContainerView} from '../../misc/validationErrorsContainerView';
import {SubmittedService} from '../../features';

//TODO: add support for setting renderer factory options using input

/**
 * Directive that is attached to control element and handles css classes that are added to this element
 */
@Directive(
{
    selector: '[hasError][formControlName],[hasError][formControl],[hasError][ngModel]',
})
export class HasErrorDirective implements OnInit, AfterViewInit, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Subscriptions that are destroyed with destruction of this directive
     */
    protected subscriptions: Subscription = new Subscription();

    /**
     * Unique generated id of control
     */
    protected id: string = generateId(10);

    /**
     * Last value of control pristine attribute
     */
    protected previousDirty: boolean = false;

    /**
     * Indication whether currently are any errors rendered
     */
    protected hasErrors: boolean = false;

    //######################### protected properties #########################

    /**
     * Gets control which was assigned to this element
     */
    protected get control(): FormControl
    {
        return this.formControl?.control || this.formControlName?.control || this.ngModel?.control;
    }

    //######################### public properties #########################

    /**
     * Instance of validation error renderer
     */
    public renderer: ValidationErrorRenderer;

    //######################### public propeties - inputs #########################

    /**
     * Customized error messages
     */
    @Input()
    public errorMessages: StringDictionary;

    /**
     * Custom component used for rendering validation errors
     */
    @Input()
    public errorsComponent?: Type<ValidationErrorsComponent>;

    /**
     * Custom template used for rendering validation errors
     */
    @Input()
    public errorsTemplate?: TemplateRef<LegacyValidationErrorsTemplateContext>;

    //######################### constructor #########################
    constructor(protected rendererFactory: ValidationErrorRendererFactory,
                protected viewContainer: ViewContainerRef,
                @Optional() @SkipSelf() protected groupHasError: GroupHasErrorDirective,
                @Optional() protected formControl: FormControlDirective,
                @Optional() protected formControlName: FormControlName,
                @Optional() protected ngModel: NgModel,
                @Optional() protected submittedSvc: SubmittedService,
                @Optional() protected containerView: ValidationErrorsContainerView,
                @Inject(STRING_LOCALIZATION) protected stringLocalization: StringLocalization,
                protected injector: Injector,)
    {
    }

    //######################### public methods - implementation of OnInit #########################

    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this.containerView ??= new ValidationErrorsContainerView();
        this.containerView.viewContainer ??= this.viewContainer;

        this.subscriptions.add(this.stringLocalization.textsChange.subscribe(() => this.updateStatus()));
        this.subscriptions.add(this.control.statusChanges.subscribe(() => this.updateStatus()));
        this.subscriptions.add(this.control
                                    .events
                                    .pipe(filter(itm => itm instanceof PristineChangeEvent))
                                    .subscribe(event =>
                                    {
                                        const pristineEvent = event as PristineChangeEvent;

                                        //only if dirty(pristine) is different
                                        if(pristineEvent.pristine == this.previousDirty)
                                        {
                                            this.updateStatus();
                                        }
                                    }));

        if(this.submittedSvc)
        {
            this.subscriptions.add(toObservable(this.submittedSvc.submitted, {injector: this.injector}).pipe(skip(1)).subscribe(() => this.isSubmittedOrDirty(() => this.updateStatus())));
        }
    }

    //######################### public methods - implementation of AfterViewInit #########################

    /**
     * Called when view was initialized
     */
    public ngAfterViewInit(): void
    {
        this.renderer = this.rendererFactory.create(this.control,
                                                    this.containerView,
                                                    this.injector,
                                                    this.isSubmittedOrDirty);

        this.updateStatus();
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.subscriptions.unsubscribe();

        this.groupHasError?.unregisterControl(this.id);
        this.renderer?.destroy();
    }

    //######################### protected methods #########################

    /**
     * Updates status of control and css classes
     */
    protected updateStatus(): void
    {
        if(!this.renderer)
        {
            return;
        }

        const opts: ValidationErrorsRendererOptions = {};

        if(this.errorsTemplate)
        {
            opts.template = this.errorsTemplate;
        }
        else if(this.errorsComponent)
        {
            opts.component = this.errorsComponent;
        }

        this.previousDirty = this.control.dirty;
        this.hasErrors = this.renderer.update(opts, this.errorMessages);
        this.toggleGroupHasError();
    }

    /**
     * Toggles registration of control in parent group
     */
    protected toggleGroupHasError(): void
    {
        if(this.groupHasError)
        {
            this.isSubmittedOrDirty(() => this.groupHasError.registerControl(this.id),
                                    () => this.groupHasError.unregisterControl(this.id),
                                    this.hasErrors);
        }
    }

    /**
     * Calls action when form is submitted or control is dirty
     * @param action - Action to be called when form is submitted or control dirty
     * @param falseAction - Action to be called when form is not submitted and control is not dirty
     * @param additionalCondition - Additional condition to be evaluated
     */
    @BindThis
    protected isSubmittedOrDirty(action: () => void, falseAction: () => void = () => {}, additionalCondition: boolean = true): void
    {
        //submitted form or dirty control
        if((this.submittedSvc?.submitted() ||
            this.control?.dirty) &&
           additionalCondition)
        {
            action();
        }
        else
        {
            falseAction();
        }
    }
}