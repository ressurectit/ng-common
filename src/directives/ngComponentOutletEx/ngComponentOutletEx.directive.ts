import {ComponentFactoryResolver,
        EventEmitter,
        ComponentRef,
        Directive,
        Injector,
        Input,
        NgModuleFactory,
        NgModuleRef,
        OnChanges,
        OnDestroy,
        SimpleChanges,
        Type,
        ViewContainerRef,
        Output} from '@angular/core';
import {nameof} from '@jscrpt/common';
        

/**
 * Instantiates a single Component type and inserts its Host View into current View.
 */
@Directive(
{
    selector: '[ngComponentOutletEx]',
    exportAs: 'ngComponentOutletEx'
})
export class NgComponentOutletEx<TComponent> implements OnChanges, OnDestroy
{
    //######################### private fields #########################

    /**
     * Created component reference
     */
    private _componentRef: ComponentRef<TComponent>|null = null;
    
    /**
     * Created custom module reference
     */
    private _moduleRef: NgModuleRef<any>|null = null;

    //######################### public properties - inputs #########################
    
    /**
     * Type that should be dynamically created into current container
     */
    @Input() 
    public ngComponentOutletEx: Type<TComponent>;

    /**
     * Custom injector that will be used for newly created component
     */
    @Input() 
    public ngComponentOutletExInjector: Injector;

    /**
     * Projectable nodes that can be injected into component
     */
    @Input() 
    public ngComponentOutletExContent: any[][];

    /**
     * Different module factory that is used for creation of new component
     */
    @Input() 
    public ngComponentOutletExNgModuleFactory: NgModuleFactory<any>;

    //######################### public properties - outputs #########################

    /**
     * Occurs when component is created or destroyed, it can send instance of component, or null
     */
    @Output()
    public ngComponentOutletExCreated: EventEmitter<TComponent|null> = new EventEmitter<TComponent|null>();

    //######################### public properties #########################

    /**
     * Instance of dynamically created component 
     */
    public get component(): TComponent|null
    {
        if(!this._componentRef)
        {
            return null;
        }

        return this._componentRef.instance;
    }

    //######################### constructor #########################
    constructor(private _viewContainerRef: ViewContainerRef)
    {
    }

    //######################### public methods - implementation of OnChanges #########################
    public ngOnChanges(changes: SimpleChanges)
    {
        this._viewContainerRef.clear();
        this._componentRef = null;

        if (this.ngComponentOutletEx)
        {
            const elInjector = this.ngComponentOutletExInjector || this._viewContainerRef.parentInjector;

            if (changes[nameof<NgComponentOutletEx<TComponent>>('ngComponentOutletExNgModuleFactory')])
            {
                if (this._moduleRef)
                {
                    this._moduleRef.destroy();
                }

                if (this.ngComponentOutletExNgModuleFactory)
                {
                    const parentModule = elInjector.get(NgModuleRef);
                    this._moduleRef = this.ngComponentOutletExNgModuleFactory.create(parentModule.injector);
                }
                else
                {
                    this._moduleRef = null;
                }
            }

            const componentFactoryResolver = this._moduleRef ? this._moduleRef.componentFactoryResolver : elInjector.get(ComponentFactoryResolver);
            const componentFactory = componentFactoryResolver.resolveComponentFactory(this.ngComponentOutletEx);
            this._componentRef = this._viewContainerRef.createComponent<TComponent>(componentFactory, this._viewContainerRef.length, elInjector, this.ngComponentOutletExContent);
        }

        this.ngComponentOutletExCreated.emit(this.component);
    }

    //######################### public methods - implementation of OnDestroy #########################
    public ngOnDestroy()
    {
        if (this._moduleRef)
        {
            this._moduleRef.destroy();
        }
    }
}
