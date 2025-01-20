import {Directive, EmbeddedViewRef, Inject, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {renderToBody} from '@jscrpt/common';

/**
 * Renders element into body directly at the end
 */
@Directive(
{
    selector: '[bodyRender]',
})
export class BodyRenderDirective implements OnInit, OnDestroy
{
    //######################### protected properties #########################

    /**
     * Instance of created embedded view
     */
    protected view: EmbeddedViewRef<void>|undefined|null;

    /**
     * Instance of created element
     */
    protected element: HTMLElement|undefined|null;

    //######################### public properties - inputs #########################

    /**
     * String that defines element in which should be template rendered, if not specified, body is used
     * 
     * Allows also css class to be specified (div.body-box)
     */
    @Input('bodyRender')
    public targetElement: string|undefined|null;

    //######################### constructor #########################
    constructor(protected template: TemplateRef<void>,
                protected viewContainer: ViewContainerRef,
                @Inject(DOCUMENT) protected document: Document,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this.view = this.viewContainer
            .createEmbeddedView(this.template);

        this.element = this.view.rootNodes[0] as HTMLElement;

        renderToBody(this.document, this.element, this.targetElement);
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.element?.remove();
        this.element = null;
        this.view?.destroy();
        this.view = null;
    }
}