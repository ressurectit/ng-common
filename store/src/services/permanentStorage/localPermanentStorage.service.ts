import {ClassProvider, Injectable, Provider} from '@angular/core';
import {PERMANENT_STORAGE, PermanentStorage, PermanentStorageType, TypeProvider} from '@anglr/common';
import store from 'store';
import expirePlugin from 'store/plugins/expire';

/**
 * Implementation of permanent storage using LocalStorage
 */
@Injectable()
export class LocalPermanentStorageService implements PermanentStorage
{
    //######################### constructor #########################

    constructor()
    {
        store.addPlugin(expirePlugin);
    }

    //######################### public methods - implementation of PermanentStorage #########################

    /**
     * Gets value that was stored with 'name' from permanent storage
     * @param name - Name with which was value stored
     */
    public get<TResult>(name: string): TResult
    {
        return store.get(name);
    }

    /**
     * Sets value that will be stored with 'name'e in permanent storage
     * @param name - Name with which will be value stored
     * @param value - Value to be stored
     */
    public set(name: string, value: any): void;

    /**
     * Sets value that will be stored with 'name' in permanent storage until expiration date
     * @param name - Name with which will be value stored
     * @param value - Value to be stored
     * @param expires - Time when value should expire
     */
    public set(name: string, value: any, expires: Date): void;

    /**
     * Sets value that will be stored with 'name' in permanent storage until expiration date
     * @param name - Name with which will be value stored
     * @param value - Value to be stored
     * @param expires - Time when value should expire
     */
    public set(name: string, value: any, expires?: Date): void
    {
        if(expires)
        {
            store.set(name, value, expires.valueOf());
        }
        else
        {
            store.set(name, value);
        }
    }

    /**
     * Removes value stored with 'name' from permanent storage
     * @param name - Name of stored value that will be removed
     */
    public remove(name: string): void
    {
        store.remove(name);
    }
}

/**
 * Provider for permanent storage that is using local storage implementation
 */
const LOCAL_PERMANENT_STORAGE: Provider =
<ClassProvider>
{
    provide: PERMANENT_STORAGE,
    useClass: LocalPermanentStorageService
};

/**
 * Type that contains provider for local permanent storage when used with `providePermanentStorage`
 */
@TypeProvider(LOCAL_PERMANENT_STORAGE)
class LocalPermanentStorageType
{
}

/**
 * Sets permanent storage to use local permanent storage when used with `providePermanentStorage`
 */
export const LocalPermanentStorage: PermanentStorageType = LocalPermanentStorageType;