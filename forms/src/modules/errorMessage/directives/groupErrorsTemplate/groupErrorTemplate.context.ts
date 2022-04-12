import {Dictionary} from '@jscrpt/common';

/**
 * Context passed to template of group error
 */
export interface GroupErrorsTemplateContext
{
    /**
     * Name/code of error
     */
    $implicit: string;

    /**
     * Indication whether rendered error is last
     */
    last: boolean;

    /**
     * Indication whether rendered error is first
     */
    first: boolean;

    /**
     * Index of currently rendered item
     */
    index: number;

    /**
     * Object storing all errors for form group
     */
    errors: Dictionary;
}