import {Injector} from '@angular/core';

/**
 * Represents default args for form model builder
 */
export interface FormModelBuilderDefaultArgs
{
    /**
     * Injector that could be used in validators
     */
    injector?: Injector;
}