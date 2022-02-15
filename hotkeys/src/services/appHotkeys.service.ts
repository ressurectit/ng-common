import {Injectable} from "@angular/core";
import {HotkeysService, Hotkey} from "angular2-hotkeys";

/**
 * Application hotkeys service
 */
@Injectable()
export class AppHotkeysService
{
    //######################### private fields #########################

    /**
     * Old hotkeys from parent
     */
    private _oldHotkeys: Hotkey[] = [];

    /**
     * Hotkeys for current service
     */
    private _hotkeys: Hotkey[] = [];

    /**
     * Array of scoped instances of AppHotkeysService
     */
    private _scoped: {element: HTMLElement; hotkeys: AppHotkeysService}[] = [];

    /**
     * Instance of mousetrap that is attached to specific element
     */
    private _mousetrap: MousetrapInstance = null;

    //######################### public properties #########################

    /**
     * Hotkeys service used for handling hotkeys
     */
    public hotkeys: HotkeysService;

    //######################### constructor #########################
    constructor(private _hotkeySvc: HotkeysService)
    {
        this.hotkeys = new Proxy(this._hotkeySvc,
        {
            get: (target: HotkeysService, property: string, receiver: any) =>
            {
                if(property == 'add')
                {
                    return new Proxy(Reflect.get(target, property, receiver), 
                    {
                        apply: (method: (hotkey: Hotkey | Hotkey[], specificEvent?: string ) => Hotkey | Hotkey[], _thisArg: any, argArray: any) =>
                        {
                            this._processAddedHotkeys(argArray[0]);

                            return method.apply(this._hotkeySvc, argArray);
                        }
                    });
                }
                else
                {
                    return Reflect.get(target, property, receiver);
                }
            }
        });
    }

    //######################### public methods #########################

    /**
     * Creates scoped hotkeys for html element
     * @param element - Html element used as scope base for hotkeys
     * @param scopedInitialization - Method used for initialization scoped hotkeys, hotkeys can be initialized only inside this method
     */
    public withScope(element: HTMLElement, scopedInitialization: (appHotkeysService: AppHotkeysService) => void)
    {
        let tmp = this._scoped.find(itm => itm.element == element);
        let appHotkeysService: AppHotkeysService;

        if(!tmp)
        {
            appHotkeysService = new AppHotkeysService(this._hotkeySvc);
            appHotkeysService._mousetrap = new Mousetrap(element);
        }
        else
        {
            appHotkeysService = tmp.hotkeys;
        }

        let oldHotkeys = appHotkeysService._hotkeySvc.mousetrap;
        appHotkeysService._hotkeySvc.mousetrap = appHotkeysService._mousetrap;

        scopedInitialization(appHotkeysService);

        appHotkeysService._hotkeySvc.mousetrap = oldHotkeys;
    }

    /**
     * This method should be called in ngOnDestroy for each component which registered new hotkeys
     */
    public destroy()
    {
        this._scoped.forEach(scoped =>
        {
            scoped.hotkeys.destroy();
        });

        this._scoped = [];

        let oldMouseTrap;

        if(this._mousetrap)
        {
            oldMouseTrap = this._hotkeySvc.mousetrap;
            this._hotkeySvc.mousetrap = this._mousetrap;
        }

        //remove all hotkeys registered by this service
        this._hotkeys.forEach(key =>
        {
            this._hotkeySvc.remove(key);
        });

        this._hotkeys = [];

        //restore old hotkeys from parent component
        this._oldHotkeys.forEach(key =>
        {
            this._hotkeySvc.add(key);
        });

        this._oldHotkeys = [];

        if(this._mousetrap)
        {
            this._hotkeySvc.mousetrap = oldMouseTrap;
            this._mousetrap.reset();
            this._mousetrap = null;
        }
    }

    //######################### private methods #########################

    /**
     * Process added hotkeys, stores old ones
     * @param hotkey - Hotkey to be added
     */
    private _processAddedHotkeys(hotkey: Hotkey | Hotkey[])
    {
        if(Array.isArray(hotkey)) 
        {
            hotkey.forEach(key =>
            {
                this._processAddedHotkeys(key);
            });

            return;
        }

        let oldHotkey = this._hotkeySvc.get(hotkey.combo)[0];

        if(oldHotkey)
        {
            this._hotkeySvc.remove(oldHotkey);
            this._oldHotkeys.push(oldHotkey);
        }

        this._hotkeys.push(hotkey);
    }
}