import {Directive, ExistingProvider} from '@angular/core';

import {ValidationErrorsContainerView} from '../../misc/validationErrorsContainerView';
import {GroupHasErrorDirective} from '../groupHasError/groupHasError.directive';

/**
 * Directive that is attached to parent element of inputs group and handles css class that is added to this element and registers provider for ValidationErrorsContainerView
 */
@Directive(
{
    selector: '[groupHasErrorContainer]',
    standalone: true,
    providers:
    [
        <ExistingProvider>
        {
            provide: GroupHasErrorDirective,
            useExisting: GroupHasErrorContainerDirective
        },
        ValidationErrorsContainerView
    ]
})
export class GroupHasErrorContainerDirective extends GroupHasErrorDirective
{
}