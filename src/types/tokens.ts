import {InjectionToken, Type} from '@angular/core';
import {HttpContextToken} from '@angular/common/http';

import {StringLocalization, NoStringLocalizationService} from '../services/stringLocalization';
import {PermanentStorage} from '../services/permanentStorage';
import {Logger, DummyLoggerService} from '../services/logger';
import {TemporaryStorage, MemoryTemporaryStorageService} from '../services/temporaryStorage';
import {Notifications} from '../services/notifications';
import {Position} from '../services/position';

/**
 * Base url when using HTTP (example: http://localhost:8888/)
 */
export const HTTP_REQUEST_BASE_URL: InjectionToken<string> = new InjectionToken<string>('HTTP_REQUEST_BASE_URL');

/**
 * Token is used to transfer http request cookie header
 */
export const HTTP_REQUEST_COOKIE_HEADER: InjectionToken<string> = new InjectionToken<string>('HTTP_REQUEST_COOKIE_HEADER');

/**
 * Token is used to transfer http request authentication header
 */
export const HTTP_REQUEST_AUTH_HEADER: InjectionToken<string> = new InjectionToken<string>('HTTP_REQUEST_AUTH_HEADER');

/**
 * Token used for injecting Logger implementation
 */
export const LOGGER: InjectionToken<Logger> = new InjectionToken<Logger>('LOGGER', {providedIn: 'root', factory: () => new DummyLoggerService()});

/**
 * Token used for injecting StringLocalization service implementation
 */
export const STRING_LOCALIZATION: InjectionToken<StringLocalization> = new InjectionToken<StringLocalization>('STRING_LOCALIZATION', {providedIn: 'root', factory: () => new NoStringLocalizationService()});

/**
 * Token used for injecting permanent storage
 */
export const PERMANENT_STORAGE: InjectionToken<PermanentStorage> = new InjectionToken<PermanentStorage>('PERMANENT_STORAGE');

/**
 * Token used for injecting temporary storage
 */
export const TEMPORARY_STORAGE: InjectionToken<TemporaryStorage> = new InjectionToken<TemporaryStorage>('TEMPORARY_STORAGE', {providedIn: 'root', factory: () => new MemoryTemporaryStorageService()});

/**
 * Token used for injecting service that is used for positioning of one element against another
 */
export const POSITION: InjectionToken<Position> = new InjectionToken<Position>('POSITION');

/**
 * Token used for injecting notifications service implementation
 */
export const NOTIFICATIONS: InjectionToken<Notifications> = new InjectionToken<Notifications>('NOTIFICATIONS');

/**
 * Token used for injecting notifications scope name
 */
export const NOTIFICATIONS_SCOPE: InjectionToken<string> = new InjectionToken<string>('NOTIFICATIONS_SCOPE');

/**
 * Http context token storing array of ignored interceptors types
 */
export const IGNORED_INTERCEPTORS: HttpContextToken<Type<unknown>[]> = new HttpContextToken<Type<unknown>[]>(() => []);
