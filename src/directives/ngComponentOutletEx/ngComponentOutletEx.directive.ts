import {EventEmitter, ComponentRef, Directive, Injector, Input, OnChanges, Type, ViewContainerRef, Output} from '@angular/core';

//TODO: add module as origin componentOutlet has

/**
 * Instantiates a single Component type and inserts its Host View into current View.
 */
@Directive(
{
    selector: '[ngComponentOutletEx]',
    exportAs: 'ngComponentOutletEx',
    standalone: true,
})
export class NgComponentOutletEx<TComponent> implements OnChanges
{
    //######################### private fields #########################

    /**
     * Created component reference
     */
    private _componentRef: ComponentRef<TComponent>|null = null;
    
    //######################### public properties - inputs #########################
    
    /**
     * Type that should be dynamically created into current container
     */
    @Input() 
    public ngComponentOutletEx: Type<TComponent>|undefined|null;

    /**
     * Custom injector that will be used for newly created component
     */
    @Input() 
    public ngComponentOutletExInjector: Injector|undefined|null;

    /**
     * Projectable nodes that can be injected into component
     */
    @Input() 
    public ngComponentOutletExContent: Node[][]|undefined|null;

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
    public ngOnChanges(): void
    {
        this._viewContainerRef.clear();
        this._componentRef = null;

        if (this.ngComponentOutletEx)
        {
            const injector = this.ngComponentOutletExInjector ?? this._viewContainerRef.injector;

            this._componentRef = this._viewContainerRef.createComponent<TComponent>(this.ngComponentOutletEx,
                                                                                    {
                                                                                        injector,
                                                                                        projectableNodes: this.ngComponentOutletExContent ?? undefined
                                                                                    });
        }

        this.ngComponentOutletExCreated.emit(this.component);
    }
}
