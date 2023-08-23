import {Injectable, forwardRef} from '@angular/core';
import {PERMANENT_STORAGE, PermanentStorage, TypeProvider} from '@anglr/common';
import store from 'store';
import expirePlugin from 'store/plugins/expire';

/**
 * Implementation of permanent storage using LocalStorage
 */
@Injectable()
@TypeProvider({provide: PERMANENT_STORAGE, useClass: forwardRef(() => LocalPermanentStorage)})
export class LocalPermanentStorage implements PermanentStorage
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
