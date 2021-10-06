import {Injectable, InjectionToken, Optional, SkipSelf, Type} from '@angular/core';
import {Dictionary, generateId} from '@jscrpt/common';
import {Observable, Subject, Subscription} from 'rxjs';

import {NOTIFICATIONS, NOTIFICATIONS_SCOPE} from '../../types/tokens';
import {Notifications, Notification, NotificationSeverity, NotificationsProvider, NotificationsScopeProviderFactory, NotificationsScopeProvider} from './notifications.interface';
import {NotificationsOptions} from './notificationsOptions';

/**
 * Default notifications service implementation
 */
@Injectable()
export class DefaultNotificationsService implements Notifications
{
    //######################### protected fields #########################

    /**
     * Array of notifications
     */
    protected _notifications: Notification[] = [];

    /**
     * Array of notifications timeouts
     */
    protected _notificationsTimeouts: number[] = [];

    /**
     * Subject used for emitting changes of current notifications
     */
    protected _notificationsChange: Subject<void> = new Subject<void>();

    /**
     * Subject used for emitting event when instance is being destroyed
     */
    protected _destroy: Subject<void> = new Subject<void>();

    /**
     * Array of scoped notifications
     */
    protected _scopes: Dictionary<[Notifications, Subscription]> = {};

    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    public get notifications(): readonly Notification[]
    {
        return [...this._notifications];
    }

    /**
     * @inheritdoc
     */
    public get notificationsChange(): Observable<void>
    {
        return this._notificationsChange.asObservable();
    }

    /**
     * @inheritdoc
     */
    public get destroy(): Observable<void>
    {
        return this._destroy.asObservable();
    }

    //######################### constructor #########################
    constructor(@Optional() protected _options: NotificationsOptions)
    {
        if(!this._options || !(this._options instanceof NotificationsOptions))
        {
            this._options = new NotificationsOptions();
        }
    }

    //######################### public methods - implementation of Notifications #########################
    
    /**
     * @inheritdoc
     */
    public message(message: string, severity: NotificationSeverity): Notifications
    {
        const notification = new Notification(message, severity);
        
        this._notifications.push(notification);
        this._notificationsChange.next();

        // set timeout
        if(this._options.timeout > 0)
        {
            this._notificationsTimeouts.push(setTimeout(() =>
            {
                this.remove(notification);
            }, this._options.timeout) as any);
        }

        return this;
    }

    /**
     * @inheritdoc
     */
    public default(message: string): Notifications
    {
        return this.message(message, NotificationSeverity.Default);
    }

    /**
     * @inheritdoc
     */
    public success(message: string): Notifications
    {
        return this.message(message, NotificationSeverity.Success);
    }
    
    /**
     * @inheritdoc
     */
    public error(message: string): Notifications
    {
        return this.message(message, NotificationSeverity.Error);
    }
    
    /**
     * @inheritdoc
     */
    public info(message: string): Notifications
    {
        return this.message(message, NotificationSeverity.Info);
    }
    
    /**
     * @inheritdoc
     */
    public warning(message: string): Notifications
    {
        return this.message(message, NotificationSeverity.Warning);
    }

    /**
     * @inheritdoc
     */
    public clearNotifications(): Notifications
    {
        while(this._notifications[0])
        {
            this._remove(this._notifications[0], false);
        }

        this._notificationsChange.next();

        return this;
    }

    /**
     * @inheritdoc
     */
    public remove(notification: Notification): Notifications
    {
        return this._remove(notification);
    }

    /**
     * @inheritdoc
     */
    public getScope(scopeName: string): Notifications
    {
        let scopeObj = this._scopes[scopeName];
        let scope: Notifications;

        // no scope yet
        if(!scopeObj)
        {
            scope = new DefaultNotificationsService(this._options);
            const subscription = new Subscription();

            this._scopes[scopeName] = [scope, subscription];

            //destroys and removes scope
            subscription.add(scope.destroy.subscribe(() =>
            {
                delete this._scopes[scopeName];
                subscription.unsubscribe();
            }));
        }
        else
        {
            scope = scopeObj[0];
        }

        return scope;
    }

    /**
     * @inheritdoc
     */
    public ngOnDestroy(): void
    {
        this._destroy.next();
        this._destroy.complete();
        this._notificationsChange.complete();

        Object.keys(this._scopes).forEach(scopeName =>
        {
            const [scope] = this._scopes[scopeName];

            scope.ngOnDestroy();
        });
    }

    //######################### protected methods #########################

    /**
     * Removes notification from array of notifications
     * @param notification - Notification to be removed
     * @param emitEvent - Indication whether emit event on removal
     */
    protected _remove(notification: Notification, emitEvent: boolean = true): Notifications
    {
        const index = this._notifications.indexOf(notification);

        if(index < 0)
        {
            return this;
        }

        this._notifications.splice(index, 1);

        if(emitEvent)
        {
            this._notificationsChange.next();
        }

        // clear timeout
        if(this._options.timeout > 0)
        {
            clearTimeout(this._notificationsTimeouts[index]);
            this._notificationsTimeouts.splice(index, 1);
        }

        return this;
    }
}

/**
 * Default notifications provider
 */
const DEFAULT_NOTIFICATIONS: NotificationsProvider =
{
    provide: NOTIFICATIONS,
    useClass: DefaultNotificationsService
};

/**
 * Factory that creates notifications provider for scope
 */
const notificationsFactory = (scopeName: string, token?: Function | Type<any> | InjectionToken<unknown>) =>
{
    return <NotificationsScopeProvider> [
        {
            provide: NOTIFICATIONS_SCOPE,
            useValue: scopeName
        },
        {
            provide: token ?? NOTIFICATIONS,
            useFactory: (notifications: Notifications) =>
            {
                return notifications.getScope(scopeName);
            },
            deps: [[new SkipSelf(), NOTIFICATIONS]]
        }
    ];
};

Object.defineProperty(DEFAULT_NOTIFICATIONS, 'scope', 
{
    get()
    {
        const func: NotificationsScopeProviderFactory = (scopeName: string, token?: Function | Type<any> | InjectionToken<unknown>) =>
        {
            return notificationsFactory(scopeName, token);
        };

        Object.defineProperty(func, 'random', 
        {
            get()
            {
                return notificationsFactory(generateId(6));
            }
        });

        return func;
    }
});

export {DEFAULT_NOTIFICATIONS};