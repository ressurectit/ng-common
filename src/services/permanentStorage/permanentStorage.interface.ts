import {Type} from '@angular/core';

/**
 * Provides api for implementing permanent storage
 */
export interface PermanentStorage
{
    /**
     * Gets value that was stored with 'name' from permanent storage
     * @param name - Name with which was value stored
     */
    get<TResult>(name: string): TResult;

    /**
     * Sets value that will be stored with 'name'e in permanent storage
     * @param name - Name with which will be value stored
     * @param value - Value to be stored
     */
    set(name: string, value: any): void;

    /**
     * Sets value that will be stored with 'name' in permanent storage until expiration date
     * @param name - Name with which will be value stored
     * @param value - Value to be stored
     * @param expires - Time when value should expire
     */
    set(name: string, value: any, expires: Date): void;

    /**
     * Removes value stored with 'name' from permanent storage
     * @param name - Name of stored value that will be removed
     */
    remove(name: string): void;
}

/**
 * Used for restriction of permanent storage provider type only for type decorated with permanent storage provider
 */
export interface PermanentStorageType extends Type<unknown>
{
}