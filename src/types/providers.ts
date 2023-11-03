import {EnvironmentProviders, Type, makeEnvironmentProviders} from '@angular/core';

import {PermanentStorage} from '../services/permanentStorage/permanentStorage.interface';
import {Position} from '../services/position/position.interface';
import {StringLocalization} from '../services/stringLocalization/stringLocalization.interface';
import {TemporaryStorage} from '../services/temporaryStorage/temporaryStorage.interface';
import {Logger} from '../modules/logger';
import {getProviderForType} from '../decorators';

/**
 * Provides logger service type
 * @param type - Type of logger that should be used
 */
export function provideLogger(type: Type<Logger>): EnvironmentProviders
{
    return makeEnvironmentProviders(
    [
        getProviderForType(type),
    ]);
}

/**
 * Provides permanent storage service type
 * @param type - Type of permanent storage that should be used
 */
export function providePermanentStorage(type: Type<PermanentStorage>): EnvironmentProviders
{
    return makeEnvironmentProviders(
    [
        getProviderForType(type),
    ]);
}

/**
 * Provides position service type
 * @param type - Type of position that should be used
 */
export function providePosition(type: Type<Position>): EnvironmentProviders
{
    return makeEnvironmentProviders(
    [
        getProviderForType(type),
    ]);
}

/**
 * Provides string localization service type
 * @param type - Type of string localization that should be used
 */
export function provideStringLocalization(type: Type<StringLocalization>): EnvironmentProviders
{
    return makeEnvironmentProviders(
    [
        getProviderForType(type),
    ]);
}

/**
 * Provides temporary storage service type
 * @param type - Type of temporary storage that should be used
 */
export function provideTemporaryStorage(type: Type<TemporaryStorage>): EnvironmentProviders
{
    return makeEnvironmentProviders(
    [
        getProviderForType(type),
    ]);
}
