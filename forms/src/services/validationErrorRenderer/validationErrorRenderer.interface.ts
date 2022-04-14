import {Type, TemplateRef, Injector} from '@angular/core';
import {FormControl} from '@angular/forms';
import {StringDictionary} from '@jscrpt/common';

import {ErrorMessagesExtractor} from '../errorMessagesExtractor/errorMessagesExtractor.service';
import {ValidationErrorsResult} from '../errorMessagesExtractor/errorMessagesExtractor.interface';
import {ValidationErrorsContainerView} from '../../misc/validationErrorsContainerView';

/**
 * Describes function that is used for performing actions when form is submitted or dirty
 */
export interface IsSubmittedOrDirtyFunc
{
    /**
     * Calls action when form is submitted or control is dirty
     * @param action - Action to be called when form is submitted or control dirty
     * @param falseAction - Action to be called when form is not submitted and control is not dirty
     * @param additionalCondition - Additional condition to be evaluated
     */
    (action: () => void, falseAction?: () => void, additionalCondition?: boolean): void;
}

/**
 * Component that is used for rendering validation errors
 */
export interface ValidationErrorsComponent
{
    /**
     * Shows validation errors in component
     * @param errors - Errors to be shown
     * @param options - Options used for displaying validation errors
     */
    show(errors: ValidationErrorsResult, options: ValidationErrorsOptions): void;
}

/**
 * Context passed to template that is used for rendering validation errors
 */
export interface ValidationErrorsTemplateContext
{
    /**
     * Errors to be shown
     */
    $implicit: ValidationErrorsResult;

    /**
     * Options used for displaying validation errors
     */
    options: ValidationErrorsOptions;
}

/**
 * Component that is used for rendering validation errors container
 */
export interface ValidationErrorsContainerComponent
{
    /**
     * Shows validation errors
     * @param errors - Errors to be shown
     * @param options - Options used for displaying validation errors
     */
    show(errors: ValidationErrorsResult, options: ValidationErrorsContainerOptions): void;

    /**
     * Hides validation errors
     */
    hide(): void;
}

/**
 * Options for displayed validation errors
 */
export interface ValidationErrorsOptions
{
    /**
     * Prefix of css classes applied to element
     */
    prefix?: string;

    /**
     * Suffix of css classes applied to element
     */
    suffix?: string;

    /**
     * Css class attached to wrapper div
     */
    wrapperDivClass?: string;
}

/**
 * Options for validation errors container
 */
export interface ValidationErrorsContainerOptions extends ValidationErrorsOptions
{
    /**
     * Component used for rendering validation errors
     */
    component?: Type<ValidationErrorsComponent>;

    /**
     * Template used for rendering validation errors
     */
    template?: TemplateRef<ValidationErrorsTemplateContext>;
}

/**
 * Options for ValidationErrorRenderer
 */
export interface ValidationErrorsRendererOptions extends ValidationErrorsContainerOptions
{
    /**
     * Component used for rendering validation errors container
     */
    container?: Type<ValidationErrorsContainerComponent>;
}

/**
 * Options for ValidationErrorRendererFactory
 */
export interface ValidationErrorRendererFactoryOptions extends ValidationErrorsRendererOptions
{
    /**
     * Type of ValidationErrorRenderer implementation
     */
    rendererType?: ValidationErrorRendererCtor;
}

/**
 * Describes type that represents ValidationErrorRenderer
 */
export interface ValidationErrorRendererCtor
{
    /**
     * Creates instance of ValidationErrorRenderer
     * @param errorMessagesExtractor - Instance of service used for extracting errors from control
     * @param control - Control that is being processed for errors
     * @param containerView - Class that stores view container for rendering errors
     * @param injector - Injector used for obtaining dependencies
     * @param isSubmittedOrDirty - Function used for testing if control is submitted or dirty
     * @param options - Options for validation errors renderer
     */
    new(errorMessagesExtractor: ErrorMessagesExtractor,
        control: FormControl,
        containerView: ValidationErrorsContainerView,
        injector: Injector,
        isSubmittedOrDirty: IsSubmittedOrDirtyFunc,
        options: ValidationErrorsRendererOptions): ValidationErrorRenderer;
}

/**
 * Describes service that is used for rendering validation errors
 */
export interface ValidationErrorRenderer
{
    /**
     * Destroys renderer and everything that was rendered
     */
    destroy(): void;
    
    /**
     * Updates rendered errors for current state and returns true if errors were rendered, otherwise false
     * @param options - Options for validation errors renderer
     * @param errorMessages - Object storing error messages to be used as override
     */
    update(options: ValidationErrorsRendererOptions, errorMessages?: StringDictionary): boolean;
}