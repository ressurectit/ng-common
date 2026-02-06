import {Component, ChangeDetectionStrategy, viewChild, Signal, ViewContainerRef, InputSignal, input, effect, inputBinding} from '@angular/core';
import {AnimateDirective} from '@anglr/animations';
import {nameof} from '@jscrpt/common';

import {ValidationErrorComponent, ValidationErrorData, ValidationErrorsContainerComponent, ValidationErrorsContainerOptions} from '../../interfaces';

/**
 * Component used as container displaying validation errors
 */
@Component(
{
    selector: 'validation-errors',
    templateUrl: 'validationErrorsContainer.component.html',
    host:
    {
        '[class]': 'options().cssClass',
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationErrorsContainer implements ValidationErrorsContainerComponent
{
    //######################### protected properties - children #########################

    /**
     * @inheritdoc
     */
    protected viewContainer: Signal<ViewContainerRef> = viewChild.required('container', {read: ViewContainerRef});

    //######################### public properties - inputs #########################

    /**
     * @inheritdoc
     */
    public errors: InputSignal<ValidationErrorData[]> = input.required();

    /**
     * @inheritdoc
     */
    public options: InputSignal<ValidationErrorsContainerOptions> = input.required();

    //######################### constructor #########################
    constructor()
    {
        effect(() =>
        {
            const viewContainer = this.viewContainer();
            const errors = this.errors();
            const options = this.options();

            viewContainer.clear();

            for(const error of errors)
            {
                if(options.validationErrorTemplate)
                {
                    viewContainer.createEmbeddedView(options.validationErrorTemplate, {$implicit: error});
                }
                else
                {
                    viewContainer.createComponent(options.validationErrorType,
                                                  {
                                                      bindings:
                                                      [
                                                          inputBinding(nameof<ValidationErrorComponent>('error'), () => error),
                                                      ],
                                                      directives:
                                                      [
                                                          {
                                                              type: AnimateDirective,
                                                              bindings:
                                                              [
                                                                  inputBinding(nameof<AnimateDirective>('enterAnimation'), () => options.validationErrorAnimateEnter),
                                                                  inputBinding(nameof<AnimateDirective>('leaveAnimation'), () => options.validationErrorAnimateLeave),
                                                              ],
                                                          },
                                                      ],
                                                  });
                }
            }
        });
    }
}
