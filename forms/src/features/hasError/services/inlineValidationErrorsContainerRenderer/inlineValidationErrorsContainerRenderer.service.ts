import {DestroyRef, effect, ElementRef, inject, inputBinding, Signal, ViewContainerRef} from '@angular/core';
import {nameof} from '@jscrpt/common';

import {ValidationErrorData, ValidationErrorsContainerComponent, ValidationErrorsContainerRenderer, ValidationErrorsContainerRendererOptions} from '../../interfaces';

/**
 * Validation errors container renderer, used for rendering validation errors container, it is created inside injection context
 *
 * Renders validation errors below form field
 */
export class InlineValidationErrorsContainerRenderer implements ValidationErrorsContainerRenderer
{
    //######################### protected fields #########################

    /**
     * Instance of validation errors container
     */
    protected validationErrorsContainer: ValidationErrorsContainerComponent|undefined|null;

    /**
     * Reference for destroy object
     */
    protected destroyRef: DestroyRef = inject(DestroyRef);

    //######################### constructor #########################
    constructor(validationErrors: Signal<ValidationErrorData[]>,
                viewContainer: Signal<ViewContainerRef>,
                _formFieldElement: ElementRef<HTMLElement>,
                options: Signal<ValidationErrorsContainerRendererOptions>,)
    {
        effect(() =>
        {
            const vc = viewContainer();
            const opts = options();

            //container is newly provided or changed
            if(!(this.validationErrorsContainer instanceof opts.validationErrorsContainerType) || !vc.length)
            {
                vc.clear();

                const ref = vc.createComponent(opts.validationErrorsContainerType,
                                               {
                                                   bindings:
                                                   [
                                                       inputBinding(nameof<ValidationErrorsContainerComponent>('errors'), validationErrors),
                                                       inputBinding(nameof<ValidationErrorsContainerComponent>('options'), () => opts.validationErrorsContainerOptions),
                                                   ],
                                               });

                this.validationErrorsContainer = ref.instance;
            }
        });

        this.destroyRef.onDestroy(() => viewContainer().clear());
    }
}
