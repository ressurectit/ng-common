import {computed, Directive, effect, ElementRef, Inject, inject, Injector, input, InputSignal, Optional, runInInjectionContext, Signal, TemplateRef, ViewContainerRef} from '@angular/core';
import {FormField} from '@angular/forms/signals';
import {deepCopyWithArrayOverride} from '@jscrpt/common/lodash';
import {generateId, RecursivePartial, StringDictionary} from '@jscrpt/common';

import {InlineValidationErrorsContainerRenderer, SubmittedService, ValidationErrorsViewContainerRegister} from '../../services';
import {HasErrorOptions, ValidationErrorData, ValidationErrorsContainerRenderer, ValidationErrorsContainerRendererOptions, ValidationErrorsTemplateContext} from '../../interfaces';
import {ValidationError, ValidationErrorsContainer} from '../../components';
import {HAS_ERROR_OPTIONS} from '../../misc/tokens';
import {GroupHasError} from '../groupHasError/groupHasError.directive';
import {VALIDATION_ERROR_MESSAGES} from '../../../../misc/tokens';

const defaultOptions: HasErrorOptions =
{
    validationErrorsContainerRendererType: InlineValidationErrorsContainerRenderer,
    validationErrorsContainerRendererOptions:
    {
        validationErrorsContainerType: ValidationErrorsContainer,
        validationErrorsContainerOptions:
        {
            cssClass: null,
            validationErrorTemplate: null,
            validationErrorType: ValidationError,
            validationErrorAnimateEnter: 'slide-in-animation',
            validationErrorAnimateLeave: 'slide-out',
        },
    },
};

/**
 * Directive that is attached to form field element and handles rendering of validation errors
 */
@Directive(
{
    selector: '[hasError][formField]',
})
export class HasError<T>
{
    //######################### protected fields #########################

    /**
     * Unique id for form field
     */
    protected id: string = generateId(10);

    /**
     * Instance of form field which errors are bound to this directive
     */
    protected formField: FormField<T> = inject(FormField);

    /**
     * Service used for indication whether form was submitted
     */
    protected submittedSvc: SubmittedService|undefined|null = inject(SubmittedService, {optional: true});

    /**
     * Instance of register for external view container
     */
    protected register: ValidationErrorsViewContainerRegister|undefined|null = inject(ValidationErrorsViewContainerRegister, {optional: true});

    /**
     * Instance of view container ref for this form field
     */
    protected viewContainer: ViewContainerRef = inject(ViewContainerRef);

    /**
     * Injector used for obtaining dependencies
     */
    protected injector: Injector = inject(Injector);

    /**
     * Instance of renderer used for rendering errors
     */
    protected renderer: ValidationErrorsContainerRenderer|undefined|null;

    /**
     * Object storing validation error messages
     */
    protected messages: StringDictionary|undefined|null = inject(VALIDATION_ERROR_MESSAGES, {optional: true});

    /**
     * Instance of element for which is this directive defined for
     */
    protected element: ElementRef<HTMLElement> = inject(ElementRef);

    /**
     * Parent group has error
     */
    protected groupHasError: GroupHasError|undefined|null = inject(GroupHasError, {optional: true});

    //######################### public properties - inputs #########################

    /**
     * Custom template for validation error
     */
    public validatioErrorTemplate: InputSignal<TemplateRef<ValidationErrorsTemplateContext>|undefined|null> = input();

    /**
     * Options for has error directive
     */
    public options: InputSignal<HasErrorOptions|undefined|null> = input();

    //######################### constructor #########################
    constructor(@Optional() @Inject(HAS_ERROR_OPTIONS) options: RecursivePartial<HasErrorOptions>|null,)
    {
        options = deepCopyWithArrayOverride({}, defaultOptions, options);

        const computedOptions: Signal<HasErrorOptions> = computed(() => ({...deepCopyWithArrayOverride(options, this.options())}));
        const rendererOptions: Signal<ValidationErrorsContainerRendererOptions> = computed(() => computedOptions().validationErrorsContainerRendererOptions);
        const viewContainerComputed: Signal<ViewContainerRef> = computed(() => this.register?.viewContainer() ?? this.viewContainer);
        const errors: Signal<ValidationErrorData[]> = computed(() =>
        {
            const state = this.formField.state();

            if((this.submittedSvc?.submitted() || state.dirty()) &&
               state.invalid())
            {
                return state.errorSummary().map(error =>
                {
                    return <ValidationErrorData>{
                        message: (error.message ? error.message : this.messages[error.kind]) ?? `No Message for ${error.kind}`,
                        type: error.kind,
                        //TODO: remove this or find way how to provide it
                        args: {},
                    };
                });
            }

            return [];
        });

        effect(() => errors().length ? this.groupHasError?.registerFormField(this.id) : this.groupHasError?.unregisterFormField(this.id));

        effect(() =>
        {
            const options = computedOptions();

            if(!(this.renderer instanceof options.validationErrorsContainerRendererType))
            {
                this.renderer = null;

                setTimeout(() =>
                {
                    this.renderer = runInInjectionContext(this.injector, () => new options.validationErrorsContainerRendererType(errors,
                                                                                                                                 viewContainerComputed,
                                                                                                                                 this.element,
                                                                                                                                 rendererOptions));
                });
            }
        });
    }
}
