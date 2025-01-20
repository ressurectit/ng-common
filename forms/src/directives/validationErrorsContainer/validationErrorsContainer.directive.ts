import {Directive, SkipSelf, ViewContainerRef} from '@angular/core';

import {ValidationErrorsContainerView} from '../../misc/validationErrorsContainerView';

/**
 * Directive that sets view container for validation errors for current element
 */
@Directive(
{
    selector: '[validationErrorsContainer]',
})
export class ValidationErrorsContainerDirective
{
    //######################### constructor #########################
    constructor(@SkipSelf() containerView: ValidationErrorsContainerView,
                viewContainer: ViewContainerRef,)
    {
        containerView.viewContainer = viewContainer;
    }
}