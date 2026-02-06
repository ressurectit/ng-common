import {TemplateRef, Type} from '@angular/core';

import {ValidationErrorComponent} from '../validationErrorComponent/validationErrorComponent.interface';
import {ValidationErrorsTemplateContext} from '../validationErrorTemplateContext/validationErrorTemplateContext.interface';

/**
 * Options for validation errors container
 */
export interface ValidationErrorsContainerOptions
{
    //######################### properties #########################

    /**
     * Type that is used for rendering validation error
     */
    validationErrorType: Type<ValidationErrorComponent>;

    /**
     * Template used for rendering validation error, this has higher precendence than `validationErrorType`
     */
    validationErrorTemplate: TemplateRef<ValidationErrorsTemplateContext>|undefined|null;

    /**
     * Css class that is applied to validation errors container itself
     */
    cssClass: string|string[]|undefined|null;

    /**
     * Animation used for animating validation error when appearing
     */
    validationErrorAnimateEnter: string;

    /**
     * Animation used for animating validation error when disappearing
     */
    validationErrorAnimateLeave: string;
}
