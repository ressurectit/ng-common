import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';
import {Dictionary} from '@jscrpt/common';

import {FormModelGroup} from '../../types';
import {FormModelBuilderDefaultArgs} from '../interfaces/formModelBuilder.interface';
import {ModelDecoratorMetadata} from '../interfaces/modelDecoratorMetadata';
import {ModelPropertyDecoratorMetadata} from '../interfaces/modelPropertyDecoratorMetadata';
import {ɵDefaultPropertyMetadata} from './defaults';
import {AsyncValidatorFnFactory, ValidatorFnFactory} from './validatorFactories';

/**
 * Builds form group from decorated model
 * @param model - Model that can be decorated for enhancing created form group with validation and so on
 * @param args - Object storing arguments from owning component for customization
 * @returns
 */
function buildFormGroup<TModel, TArgs extends Dictionary<any> = any>(model: ModelDecoratorMetadata<TModel> & Dictionary<any>, args?: TArgs&FormModelBuilderDefaultArgs): FormGroup<FormModelGroup<TModel>>
{
    if(!model)
    {
        return new FormGroup<FormModelGroup<TModel>>({} as any);
    }

    const modelMetadata: Dictionary<any> = model.ɵControlsMetadata ?? {};
    const groupValidators = model.ɵValidators ?? [];
    const groupAsyncValidators = model.ɵAsyncValidators ?? [];
    const groupArgs: Dictionary<any> = model.ɵArgs ?? {};
    const properties = Object.keys(model);
    const formGroup: FormGroup = new FormGroup({},
                                               {
                                                   validators: groupValidators?.map(validator => validator instanceof ValidatorFnFactory ? validator.valueOf()({...groupArgs, ...args}) : validator).filter(itm => !!itm),
                                                   asyncValidators: groupAsyncValidators?.map(validator => validator instanceof AsyncValidatorFnFactory ? validator.valueOf()({...groupArgs, ...args}) : validator).filter(itm => !!itm)
                                               });

    for(const propertyName of properties)
    {
        const metadata: ModelPropertyDecoratorMetadata = modelMetadata[propertyName] ?? ɵDefaultPropertyMetadata;
        const defaultValue = model[propertyName];

        //Skip control creation if value is undefined
        if(defaultValue === undefined)
        {
            continue;
        }

        const validators = metadata.validators.map(validator => validator instanceof ValidatorFnFactory ? validator.valueOf()({...metadata.args, ...args}) : validator).filter(itm => !!itm);
        const asyncValidators = metadata.asyncValidators.map(validator => validator instanceof AsyncValidatorFnFactory ? validator.valueOf()({...metadata.args, ...args}) : validator).filter(itm => !!itm);

        let control: AbstractControl;

        switch(metadata.type)
        {
            case FormGroup:
            {
                control = buildFormGroup(defaultValue, args);

                //TODO: think of setting metadata from property to model

                break;
            }
            case FormArray:
            {
                //TODO - enhance FormArray child definition and finish it
                control = new FormArray([],
                                        {
                                            validators: validators,
                                            asyncValidators: asyncValidators,
                                            ...metadata.controlOptions
                                        });

                if(defaultValue && Array.isArray(defaultValue))
                {
                    const formArray = control as FormArray;

                    for(const val of defaultValue)
                    {
                        switch(metadata.childType)
                        {
                            case FormGroup:
                            {
                                formArray.push(buildFormGroup(val, args));

                                break;
                            }
                            case FormArray:
                            {
                                break;
                            }
                            default:
                            //case FormControl:
                            {
                                formArray.push(new FormControl(val,
                                                               {
                                                                   validators: validators,
                                                                   asyncValidators: asyncValidators,
                                                                   ...metadata.controlOptions
                                                               }));

                                break;
                            }
                        }
                    }
                }

                break;
            }
            default:
            //case FormControl:
            {
                control = new FormControl(defaultValue,
                                          {
                                              validators: validators,
                                              asyncValidators: asyncValidators,
                                              ...metadata.controlOptions
                                          });

                break;
            }
        }

        if(metadata.disabled)
        {
            control.disable();
        }

        formGroup.addControl(propertyName, control);
    }

    return formGroup;
}

/**
 * Builds form from decorated model, only for properties with non `undefined` value
 * @param model - Model that can be decorated for enhancing created form group with validation and so on
 * @param args - Object storing arguments from owning component for customization
 * @returns
 */
export function buildFormModel<TModel, TArgs extends Dictionary<any> = any>(model: TModel, args?: TArgs&FormModelBuilderDefaultArgs): FormGroup<FormModelGroup<TModel>>
{
    return buildFormGroup(model as any, args);
}
