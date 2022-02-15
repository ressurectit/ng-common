import {Injectable} from "@angular/core";
import {Dictionary} from '@jscrpt/common';

import {TemporaryStorage} from "./temporaryStorage.interface";

/**
 * Implementation of temporary storage using process memory
 */
@Injectable()
export class MemoryTemporaryStorageService implements TemporaryStorage
{
    //######################### private fields #########################

    /**
     * Storage used for storing values
     */
    private _memory: Dictionary = {};

    //######################### public methods - implementation of StringLocalization #########################

    /**
     * Gets value that was stored with 'name' from temporary storage
     * @param name - Name with which was value stored
     */
    public get<TResult>(name: string): TResult
    {
        return this._memory[name];
    }

    /**
     * Sets value that will be stored with 'name'e in temporary storage
     * @param name - Name with which will be value stored
     * @param value - Value to be stored
     */
    public set(name: string, value: any): void
    {
        this._memory[name] = value;
    }

    /**
     * Removes value stored with 'name' from temporary storage
     * @param name - Name of stored value that will be removed
     */
    public remove(name): void
    {
        delete this._memory[name];
    }
}