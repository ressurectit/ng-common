import {Injectable, Injector} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Dictionary} from '@jscrpt/common';

import {buildFormModel} from '../../misc/formModel';
import {FormModelGroup} from '../../misc/types';

/**
 * Instance of form model builder, that creates `FormGroup` from form model, automatically providing `Injector`
 */
@Injectable()
export class FormModelBuilder
{
    //######################### constructor #########################
    constructor(protected _injector: Injector)
    {
    }

    //######################### public methods #########################

    /**
     * Builds form from decorated model, only for properties with non `undefined` value
     * @param model - Model that can be decorated for enhancing created form group with validation and so on
     * @param args - Object storing arguments from owning component for customization
     */
    public build<TModel, TArgs extends Dictionary<any> = any>(model: TModel, args?: TArgs): FormGroup<FormModelGroup<TModel>>
    {
        return buildFormModel<TModel, TArgs>(model,
                                             {
                                                 ...args,
                                                 injector: this._injector,
                                             });
    }
}