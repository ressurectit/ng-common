import {Type} from '@angular/core';

/**
 * Provides api for implementing temporary storage
 */
export interface TemporaryStorage
{
    /**
     * Gets value that was stored with 'name' from temporary storage
     * @param name - Name with which was value stored
     */
    get<TResult>(name: string): TResult;

    /**
     * Sets value that will be stored with 'name'e in temporary storage
     * @param name - Name with which will be value stored
     * @param value - Value to be stored
     */
    set(name: string, value: any): void;

    /**
     * Removes value stored with 'name' from temporary storage
     * @param name - Name of stored value that will be removed
     */
    remove(name: string): void;
}

/**
 * Used for restriction of temporary storage provider type only for type decorated with temporary storage provider
 */
export interface TemporaryStorageType extends Type<unknown>
{
}