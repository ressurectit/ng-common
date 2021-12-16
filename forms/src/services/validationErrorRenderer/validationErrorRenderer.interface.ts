import {Type, TemplateRef, Injector} from '@angular/core';
import {FormControl} from '@angular/forms';
import {StringDictionary} from '@jscrpt/common';

import {ErrorMessagesExtractor} from '../errorMessagesExtractor/errorMessagesExtractor.service';
import {ValidationErrorsResult} from '../errorMessagesExtractor/errorMessagesExtractor.interface';

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
     * @param errors - Errors to be shown, or null if to be hidden
     */
    show(errors: ValidationErrorsResult): void;
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
}

/**
 * Options for ValidationErrorRenderer
 */
export interface ValidationErrorsRendererOptions
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
     * @param controlElement - Html element that represents control that is being processed
     * @param document - Html document instance, used for manipulation with html
     * @param injector - Injector used for obtaining dependencies
     * @param isSubmittedOrDirty - Function used for testing if control is submitted or dirty
     * @param options - Options for validation errors renderer
     */
    new(errorMessagesExtractor: ErrorMessagesExtractor,
        control: FormControl,
        controlElement: HTMLElement,
        document: Document,
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
     * Html element that is wrapping errors
     */
    wrapperElement: HTMLElement;

    /**
     * Destroys renderer and everything that was rendered
     */
    destroy(): void;
    
    /**
     * Updates rendered errors for current state and returns true if errors were rendered, otherwise false
     * @param errorMessages - Object storing error messages to be used as override
     * @param onlyShow - Indication that update performs only displaying of existing errors
     */
    update(errorMessages?: StringDictionary, onlyShow?: boolean): boolean;
}