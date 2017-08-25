import {NgForm, FormGroup} from '@angular/forms';
import {Type, NgModuleRef} from '@angular/core';
import {Route} from '@angular/router';
import ViewTemplate from './utils.viewTemplate';
import Encoder from './utils.encoder';
import RouterHelper from './utils.routerHelper';
import Common from './utils.common';
import Forms from './utils.forms';

/**
 * View template manipulation methods
 */
export interface IViewTemplate
{
    /**
     * Compiles template into component for dynamic use
     * @param  {string} template Template string that will be compiled
     * @param  {any} data Data object passed to template
     * @returns Function Component that can be inserted into html
     */
    compileToComponent(template: string, data?: any): Function;
}

/**
 * Used for encoding/decoding strings
 */
export interface IEncoder
{
    /**
     * Decode html encoded string
     * @param  {string} input String to be decoded
     * @return string
     */
    htmlDecode(input: string): string;


    /**
     * Encodes html plain string
     * @param  {string} input String to be encoded
     * @param  {boolean} dbl Indication that double encoding should be performed
     * @returns string
     */
    htmlEncode(input:string, dbl?: boolean): string;
}

/**
 * Helper methods for angular2 router
 */
export interface IRouterHelper
{
    /**
     * Extracts route definitions from components if routes are set using decorator ComponentRoute
     * @param  {any[]} components Array of components to be used for extraction
     * @returns RouteDefinition Extracted routes
     */
    extractRoutes(components: any[]): Route[];
}

/**
 * Common utility methods
 */
export interface ICommon
{
    /**
     * Reverse current string and returns new reverse string
     * @param  {string} str String to be reversed
     * @returns string Reverse string
     */
    reverseString(str: string): string;
    
    /**
     * Extends one object with additional properties from other objects, supports deep extend
     * @param  {boolean|Object} deepOrObject Object to be extended or indication that deep copy should be performed
     * @param  {Object[]} objectN Objects that will be used for extending, if deep is used first here is target object
     * @returns Object Extended object with properties from other objects
     */
    extend(deepOrObject: boolean | Object, ...objectN: Object[]): Object;
    
    /**
     * Merges properties of two separate object into new third one
     * @param  {Object} source1 First source object 
     * @param  {Object} source2 Second source object
     * @returns Object Object containing properties from source1 and source2 objects
     */
    merge(source1: Object, source2: Object): Object;
    
    /**
     * Generates random string consisting from lowercase letters
     * @param  {number} length Length of generated string
     * @returns number Generated string
     */
    generateId(length: number);

    /**
     * Converts string in that way that first letter will be lowerCase
     * @param  {string} text Text to be converted
     */
    firstToLowerCase(text: string);

    /**
     * Runs callback function when angular module is bootstrapped and stable
     * @param {Promise<NgModuleRef<{}>>} moduleRefPromise Promise for module that was bootstrapped
     * @param {(moduleRef: NgModuleRef<{}>) => void} callback Callback that is called
     * @param {boolean} angularProfiler Indication that angular profiler should be enabled
     */
    runWhenModuleStable(moduleRefPromise: Promise<NgModuleRef<{}>>, callback: (moduleRef: NgModuleRef<{}>) => void, angularProfiler?: boolean): void;
}

/**
 * Utility methods form angular 2 forms
 */
export interface IForms
{
    /**
     * Gets indication whether controls have errors, with custom indication of submitted
     * @param  {NgForm|FormGroup} form Form containing controls
     * @param  {string[]} controls Array of controls names to be checked for errors
     * @param  {boolean} submitted Indication whether form was submitted, defaults to false
     */
    hasErrorCustom(form: NgForm|FormGroup, controls: string[], submitted?: boolean);

    /**
     * Gets indication whether hide alerts or not for control, with custom indication of submitted
     * @param  {NgForm|FormGroup} form Form containing controls
     * @param  {string} control Controls name that will be checked
     * @param  {string[]} errors Array of validation errors to be checked for existance
     * @param  {boolean} submitted Indication whether form was submitted, defaults to false
     */
    alertHiddenCustom(form: NgForm|FormGroup, control: string, errors?: string[], submitted?: boolean);

    /**
     * Gets indication whether controls have errors
     * @param  {NgForm} form Form containing controls
     * @param  {string[]} controls Array of controls names to be checked for errors
     */
    hasError(form: NgForm, controls: string[]): boolean;


    /**
     * Gets indication whether hide alerts or not for control
     * @param  {NgForm} form Form containing controls
     * @param  {string} control Controls name that will be checked
     * @param  {string[]} errors Array of validation errors to be checked for existance
     */
    alertHidden(form: NgForm, control: string, errors: string[]): void;
}

/**
 * Utils methods categories
 */
class Utils
{
    /**
     * View template manipulation methods
     */
    static get viewTemplate(): IViewTemplate
    {
        return ViewTemplate;
    }

    /**
     * Encoder of strings
     */
    static get encoder(): IEncoder
    {
        return new Encoder();
    }
    
    /**
     * Angular 2 router helper
     */
    static get routerHelper(): IRouterHelper
    {
        return RouterHelper;
    }
    
    /**
     * Common utility methods
     */
    static get common(): ICommon
    {
        return Common;
    }
    
    /**
     * Utility methods form angular 2 forms
     */
    static get forms(): IForms
    {
        return Forms;
    }
}

export {Utils};