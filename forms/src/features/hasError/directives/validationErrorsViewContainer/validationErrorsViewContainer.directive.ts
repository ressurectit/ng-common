import {Directive, ViewContainerRef} from '@angular/core';

import {ValidationErrorsViewContainerRegister} from '../../services';

/**
 * Defines view container for validation errors, using this directive registers view container in `ValidationErrorsViewContainerRegister`
 */
@Directive(
{
    selector: '[validationErrorsViewContainer]',
})
export class ValidationErrorsViewContainer
{
    //######################### constructor #########################
    constructor(register: ValidationErrorsViewContainerRegister,
                viewContainer: ViewContainerRef,)
    {
        register.setViewContainer(viewContainer);
    }
}
