import {ClassProvider, FactoryProvider, InjectionToken, Type, ValueProvider} from '@angular/core';
import {Observable} from 'rxjs';

//TODO: allow changing and merging options

/**
 * Severity of notification message
 */
export enum NotificationSeverity
{
    /**
     * Default severity of message, no special meaning
     */
    Default,

    /**
     * Information severity of message
     */
    Info,

    /**
     * Success severity of message
     */
    Success,

    /**
     * Warning severity of message
     */
    Warning,

    /**
     * Error severity of message
     */
    Error
}

/**
 * Instance of notification that is being displayed
 */
export class Notification
{
    /**
     * Gets message that this notification represents
     */
    public get message(): string
    {
        return this._message;
    }

    /**
     * Gets severity of notification message
     */
    public get severity(): NotificationSeverity
    {
        return this._severity;
    }

    //######################### constructor #########################
    
    /**
     * Creates instance of `Notification`
     * @param _message - Message that this notification represents
     * @param _severity - Severity of notification message
     */
    constructor(private _message: string,
                private _severity: NotificationSeverity)
    {
    }
}

/**
 * Manages currently displayed notifications
 */
export interface Notifications
{
    //######################### properties #########################

    /**
     * Gets array of notifications
     */
    readonly notifications: readonly Notification[];

    /**
     * Gets observable that emits changes of current notifications
     */
    readonly notificationsChange: Observable<void>;

    /**
     * Gets observable that emits event when instance is being destroyed
     */
    readonly destroy: Observable<void>;

    //######################### methods #########################
    
    /**
     * Displays message with specified severity
     * @param message - Message to be displayed
     * @param severity - Severity of displayed notification
     */
    message(message: string, severity: NotificationSeverity): Notifications;

    /**
     * Displays default notification
     * @param message - Message to be displayed
     */
    default(message: string): Notifications;

    /**
     * Displays success notification
     * @param message - Message to be displayed
     */
    success(message: string): Notifications;
    
    /**
     * Displays error notification
     * @param message - Message to be displayed
     */
    error(message: string): Notifications;
    
    /**
     * Displays info notification
     * @param message - Message to be displayed
     */
    info(message: string): Notifications;
    
    /**
     * Displays warning notification
     * @param message - Message to be displayed
     */
    warning(message: string): Notifications;

    /**
     * Clears all displayed notifications
     */
    clearNotifications(): Notifications;

    /**
     * Removes notification
     * @param notification - Notification to be removed
     */
    remove(notification: Notification): Notifications;

    /**
     * Gets scoped instance of `Notifications`
     * @param scopeName - Name of scope to be returned
     */
    getScope(scopeName: string): Notifications;

    /**
     * Destroys service and clears all used resources
     */
    ngOnDestroy(): void;
}

/**
 * Tuple that will hold notification provider and notifications scope provider
 */
export type NotificationsScopeProvider = [ValueProvider, FactoryProvider];

/**
 * Factory for creating `NotificationsScopeProvider`
 */
export interface NotificationsScopeProviderFactory
{
    /**
     * Creates `NotificationsScopeProvider` with specified `scopeName`
     * @param scopeName - Name of scope to be created
     * @param token - Custom token that can be used for injecting Notifications under custom provider
     */
    (scopeName: string, token?: Function | Type<any> | InjectionToken<unknown>): NotificationsScopeProvider;

    /**
     * Creates `NotificationsScopeProvider` with random scope name
     */
    random?: NotificationsScopeProvider;
}

/**
 * Notifications provider that allows to create scoped notifications provider
 */
export interface NotificationsProvider extends ClassProvider
{
    /**
     * Gets scoped providers
     */
    scope?: NotificationsScopeProviderFactory;
}