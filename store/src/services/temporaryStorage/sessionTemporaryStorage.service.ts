import {ClassProvider, Injectable, Provider} from '@angular/core';
import {TEMPORARY_STORAGE, TemporaryStorage, TemporaryStorageType, TypeProvider} from '@anglr/common';
import store from 'store/storages/sessionStorage';

/**
 * Implementation of temporary storage using SessionStorage
 */
@Injectable()
export class SessionTemporaryStorageService implements TemporaryStorage
{
    //######################### public methods - implementation of TemporaryStorage #########################

    /**
     * Gets value that was stored with 'name' from temporary storage
     * @param name - Name with which was value stored
     */
    public get<TResult>(name: string): TResult
    {
        return store.read(name) as any;
    }

    /**
     * Sets value that will be stored with 'name'e in temporary storage
     * @param name - Name with which will be value stored
     * @param value - Value to be stored
     */
    public set(name: string, value: any): void
    {
        store.write(name, value);
    }

    /**
     * Removes value stored with 'name' from temporary storage
     * @param name - Name of stored value that will be removed
     */
    public remove(name: string): void
    {
        store.remove(name);
    }
}

/**
 * Provider for temporary storage that is using session storage implementation
 */
const SESSION_TEMPORARY_STORAGE: Provider =
<ClassProvider>
{
    provide: TEMPORARY_STORAGE,
    useClass: SessionTemporaryStorageService
};

/**
 * Type that contains provider for session temporary storage when used with `provideTemporaryStorage`
 */
@TypeProvider(SESSION_TEMPORARY_STORAGE)
class SessionTemporaryStorageType
{
}

/**
 * Sets temporary storage to use session temporary storage when used with `provideTemporaryStorage`
 */
export const SessionTemporaryStorage: TemporaryStorageType = SessionTemporaryStorageType;