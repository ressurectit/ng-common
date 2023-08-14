import {EnvironmentProviders, makeEnvironmentProviders} from '@angular/core';

import {LoggerType} from '../services/logger/logger.interface';
import {PermanentStorageType} from '../services/permanentStorage/permanentStorage.interface';
import {PositionType} from '../services/position/position.interface';
import {StringLocalizationType} from '../services/stringLocalization/stringLocalization.interface';
import {TemporaryStorageType} from '../services/temporaryStorage/temporaryStorage.interface';
import {getProviderForType} from './providerDecoratedType';

/**
 * Provides logger service type
 * @param type - Type of logger that should be used
 */
export function provideLogger(type: LoggerType): EnvironmentProviders
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
export function providePermanentStorage(type: PermanentStorageType): EnvironmentProviders
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
export function providePosition(type: PositionType): EnvironmentProviders
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
export function provideStringLocalization(type: StringLocalizationType): EnvironmentProviders
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
export function provideTemporaryStorage(type: TemporaryStorageType): EnvironmentProviders
{
    return makeEnvironmentProviders(
    [
        getProviderForType(type),
    ]);
}
