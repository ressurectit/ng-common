import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';

/**
 * Creates `FormGroup` generic type for model
 */
export type FormModelGroup<TModel, TKey extends keyof TModel = keyof TModel> = {[TProperty in TKey]: AbstractControl<TModel[TProperty]>};

/**
 * Casts `AbstractControl` to typed `FormGroup` using model
 */
export type AsFormGroup<TModel> = FormGroup<FormModelGroup<TModel>>;

/**
 * Casts `AbstractControl` to typed `FormArray` of `FormControl` using model
 */
export type AsFormControlsArray<TModel> = FormArray<FormControl<TModel>>;

/**
 * Casts `AbstractControl` to typed `FormArray` of `FormGroup` using model
 */
export type AsFormGroupArray<TModel> = FormArray<AsFormGroup<TModel>>;

/**
 * Casts `AbstractControl` to typed `FormArray` of `AbstractControl` using model
 */
export type AsFormArray<TModel> = FormArray<AbstractControl<TModel>>;
