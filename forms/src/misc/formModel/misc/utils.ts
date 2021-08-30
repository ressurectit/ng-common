import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';

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
function buildFormGroup<TModel, TArgs = Record<string, never>>(model: ModelDecoratorMetadata<TModel>, args?: TArgs): FormGroup
{
    if(!model)
    {
        return new FormGroup({},
                             {
                                 validators: model.ɵValidators?.map(validator => validator instanceof ValidatorFnFactory ? validator.valueOf()(args) : validator).filter(itm => !!itm),
                                 asyncValidators: model.ɵAsyncValidators?.map(validator => validator instanceof AsyncValidatorFnFactory ? validator.valueOf()(args) : validator).filter(itm => !!itm)
                             });
    }

    const modelMetadata = model.ɵControlsMetadata ?? {};
    const properties = Object.keys(model);
    const formGroup: FormGroup = new FormGroup({});

    for(const propertyName of properties)
    {
        const metadata: ModelPropertyDecoratorMetadata = modelMetadata[propertyName] ?? ɵDefaultPropertyMetadata;

        // gets default value from decorator only if current value is undefined
        const defaultValue = model[propertyName];
        const validators = metadata.validators.map(validator => validator instanceof ValidatorFnFactory ? validator.valueOf()({...metadata.args, ...args}) : validator).filter(itm => !!itm);
        const asyncValidators = metadata.asyncValidators.map(validator => validator instanceof AsyncValidatorFnFactory ? validator.valueOf()({...metadata.args, ...args}) : validator).filter(itm => !!itm);

        let control: AbstractControl;

        switch(metadata.type)
        {
            case FormGroup:
            {
                control = buildFormGroup(defaultValue, args);

                break;
            }
            case FormArray:
            {
                //TODO - enhance FormArray child definition and finish it
                control = new FormArray([],
                                        {
                                            validators: validators,
                                            asyncValidators: asyncValidators
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
                                                                   asyncValidators: asyncValidators
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
                                              asyncValidators: asyncValidators
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
 * Builds form from decorated model
 * @param model - Model that can be decorated for enhancing created form group with validation and so on
 * @param args - Object storing arguments from owning component for customization
 * @returns
 */
export function buildFormModel<TModel, TArgs = Record<string, never>>(model: TModel, args?: TArgs): FormGroup
{
    return buildFormGroup(model as any, args);
}
