import {ElementRef, Signal, ViewContainerRef} from '@angular/core';

import {ValidationErrorData} from '../validationErrorData/validationErrorData.interface';
import {ValidationErrorsContainerRendererOptions} from '../validationErrorsContainerRendererOptions/validationErrorsContainerRendererOptions.interface';
import {ValidationErrorsContainerRenderer} from '../validationErrorsContainerRenderer/validationErrorsContainerRenderer.interface';

/**
 * Defines type (constructor) for creating instance of `ValidationErrorsContainerRenderer`
 */
export interface ValidationErrorsContainerRendererCtor
{
    new(validationErrors: Signal<ValidationErrorData[]>,
        viewContainer: Signal<ViewContainerRef>,
        formFieldElement: ElementRef<HTMLElement>,
        options: Signal<ValidationErrorsContainerRendererOptions>,): ValidationErrorsContainerRenderer;
}
