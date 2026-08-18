import {booleanAttribute, Directive, effect, ElementRef, inject, Injector, input, InputSignal, InputSignalWithTransform, OnDestroy, output, OutputEmitterRef, signal, TemplateRef, untracked, ViewContainerRef, WritableSignal} from '@angular/core';
import {_IdGenerator, FocusMonitor, FocusOrigin, InteractivityChecker} from '@angular/cdk/a11y';
import {hasModifierKey} from '@angular/cdk/keycodes';
import {createFlexibleConnectedPositionStrategy, createOverlayRef, createRepositionScrollStrategy, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {DOCUMENT} from '@angular/common';
import {PositionPlacement} from '@anglr/common';
import {isString, eventDispatchesNativeClick} from '@jscrpt/common';

import {getPopoverPositions} from '../../misc/utils';

/**
 * Placement used when none was set, or when unknown placement name was used
 */
const defaultPlacement: PositionPlacement = PositionPlacement.BottomStart;

/**
 * Transforms popover placement input value, allows using name of `PositionPlacement` value in templates
 * @param value - Placement value, or name of placement value
 */
function popoverPositionTransform(value: PositionPlacement|keyof typeof PositionPlacement|undefined|null): PositionPlacement
{
    if(isString(value))
    {
        return PositionPlacement[value] as PositionPlacement|undefined ?? defaultPlacement;
    }

    return value ?? defaultPlacement;
}

/**
 * Directive displaying popover with template content anchored to host element on click, popover is non modal, page behind stays interactive and scrollable, popover is repositioned while page or any scrollable ancestor of trigger element is scrolled and dismissed on outside pointer or `Escape`
 */
@Directive(
    {
        selector: '[popoverTrigger]',
        exportAs: 'popoverTrigger',
        host:
        {
            '[attr.aria-haspopup]': '"dialog"',
            '[attr.aria-expanded]': 'isOpen()',
            '[attr.aria-controls]': 'isOpen() ? panelId : null',
            '(click)': 'toggle()',
            '(keydown)': 'toggleOnKeydown($event)',
        },
    })
export class PopoverTriggerDirective implements OnDestroy
{
    //######################### private fields #########################

    /**
     * Reference to opened overlay, null when popover is closed, also serves as reactive open/closed state for host bindings
     */
    private readonly _overlayRef: WritableSignal<OverlayRef|null> = signal(null);

    /**
     * Element focused before popover was opened, focus is restored to it on close
     */
    private _previouslyFocused: HTMLElement|null = null;

    /**
     * Removes scroll listener used for repositioning of popover, null when popover is closed
     */
    private _unlistenScroll: (() => void)|null = null;

    //######################### protected properties #########################

    /**
     * Injector used for obtaining dependencies
     */
    protected readonly injector = inject(Injector);

    /**
     * Instance of HTML element to which popover is anchored
     */
    protected readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    /**
     * View container used for creating popover template portal
     */
    protected readonly viewContainerRef = inject(ViewContainerRef);

    /**
     * Document reference used for restoring focus to previously focused element on popover close
     */
    protected readonly document = inject(DOCUMENT);

    /**
     * Checker used for finding first tabbable element inside popover panel
     */
    protected readonly interactivityChecker = inject(InteractivityChecker);

    /**
     * Monitor used for restoring focus with explicit origin
     */
    protected readonly focusMonitor: FocusMonitor = inject(FocusMonitor);

    /**
     * Unique id of the overlay panel, used for aria-controls
     */
    protected readonly panelId: string = inject(_IdGenerator).getId('popover-');

    //######################### public properties - inputs #########################

    /**
     * Template rendered as popover content
     */
    public popoverTrigger: InputSignal<TemplateRef<unknown>> = input.required();

    /**
     * Placement of popover against trigger element, flips to opposite side when there is not enough space
     */
    public popoverPosition: InputSignalWithTransform<PositionPlacement, PositionPlacement|keyof typeof PositionPlacement|undefined|null> = input(defaultPlacement, {transform: popoverPositionTransform});

    /**
     * Gap in pixels between trigger and popover panel
     */
    public popoverOffset: InputSignal<number> = input<number>(0);

    /**
     * Extra css class(es) applied to overlay panel
     */
    public popoverPanelClass: InputSignal<string|string[]|undefined> = input<string|string[]|undefined>(undefined);

    /**
     * Indication whether popover is displayed also when trigger element obtains focus using keyboard
     */
    public popoverOpenOnFocus: InputSignalWithTransform<boolean, string|boolean> = input<boolean, boolean|string>(false, {transform: booleanAttribute});

    /**
     * Indication whether opening of popover is blocked, already opened popover can still be closed
     */
    public popoverDisabled: InputSignalWithTransform<boolean, string|boolean> = input<boolean, boolean|string>(false, {transform: booleanAttribute});

    //######################### public properties - outputs #########################

    /**
     * Emits after popover was opened
     */
    public popoverOpened: OutputEmitterRef<void> = output<void>();

    /**
     * Emits after popover was closed
     */
    public popoverClosed: OutputEmitterRef<void> = output<void>();

    //######################### constructor #########################
    constructor()
    {
        effect(() =>
        {
            this.popoverTrigger();

            untracked(() =>
            {
                if(this.isOpen())
                {
                    this.close();
                }
            });
        });

        effect(onCleanup =>
        {
            if(!this.popoverOpenOnFocus())
            {
                return;
            }

            const subscription = this.focusMonitor
                .monitor(this.elementRef)
                .subscribe(origin => this._openOnFocus(origin));

            onCleanup(() =>
            {
                subscription.unsubscribe();
                this.focusMonitor.stopMonitoring(this.elementRef);
            });
        });
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.close();
    }

    //######################### public methods #########################

    /**
     * Toggles popover open/closed
     */
    public toggle(): void
    {
        if(this.isOpen())
        {
            this.close();
        }
        else
        {
            this.open();
        }
    }

    /**
     * Opens popover
     */
    public open(): void
    {
        if(this.popoverDisabled() || this._overlayRef())
        {
            return;
        }

        this._previouslyFocused = this.document.activeElement as HTMLElement|null;

        const overlayRef = createOverlayRef(this.injector, this._getOverlayConfig());
        this._overlayRef.set(overlayRef);

        this._subscribeDismissEvents(overlayRef);

        overlayRef.attach(new TemplatePortal(this.popoverTrigger(), this.viewContainerRef));

        const panel = overlayRef.overlayElement;
        panel.id = this.panelId;
        panel.setAttribute('role', 'dialog');
        panel.tabIndex = -1;

        this._focusFirstTabbable(panel);

        const reposition = (): void => overlayRef.updatePosition();
        this.document.addEventListener('scroll', reposition, true);
        this._unlistenScroll = () => this.document.removeEventListener('scroll', reposition, true);

        this.popoverOpened.emit();
    }

    /**
     * Closes popover
     */
    public close(): void
    {
        const overlayRef = this._overlayRef();

        if(!overlayRef)
        {
            return;
        }

        this._unlistenScroll?.();
        this._unlistenScroll = null;

        const panel = overlayRef.overlayElement;
        const activeElement = this.document.activeElement;
        const focusInside = !!activeElement && (panel === activeElement || panel.contains(activeElement));

        overlayRef.dispose();
        this._overlayRef.set(null);

        if(focusInside && this._previouslyFocused && this.document.contains(this._previouslyFocused))
        {
            this.focusMonitor.focusVia(this._previouslyFocused, 'program');
        }

        this._previouslyFocused = null;

        this.popoverClosed.emit();
    }

    /**
     * Gets whether popover is currently open
     */
    public isOpen(): boolean
    {
        return !!this._overlayRef();
    }

    //######################### protected methods #########################

    /**
     * Toggles popover on Enter/Space keydown for trigger elements that do not dispatch a native click
     * @param event - Keyboard event
     */
    protected toggleOnKeydown(event: KeyboardEvent): void
    {
        if((event.key === ' ' || event.key === 'Enter') &&
           !hasModifierKey(event) &&
           !eventDispatchesNativeClick(this.elementRef.nativeElement, event))
        {
            event.preventDefault();
            this.toggle();
        }
    }

    //######################### private methods #########################

    /**
     * Subscribes to overlay events that should dismiss opened popover
     * @param overlayRef - Reference to opened overlay
     */
    private _subscribeDismissEvents(overlayRef: OverlayRef): void
    {
        overlayRef.outsidePointerEvents().subscribe(event =>
        {
            const target = event.target as Node|null;

            if(target && !this.elementRef.nativeElement.contains(target))
            {
                this.close();
            }
        });

        overlayRef.keydownEvents().subscribe(event =>
        {
            if(event.key === 'Escape' && !hasModifierKey(event))
            {
                event.preventDefault();
                this.close();
            }
        });
    }

    /**
     * Opens popover when trigger element obtained focus using keyboard
     * @param origin - Origin of obtained focus
     */
    private _openOnFocus(origin: FocusOrigin): void
    {
        if(origin != 'keyboard')
        {
            return;
        }

        this.open();
    }

    /**
     * Moves focus to first tabbable element inside popover panel, falls back to panel itself when there is none
     * @param panel - Overlay panel element
     */
    private _focusFirstTabbable(panel: HTMLElement): void
    {
        const focusable = Array.from(panel.querySelectorAll<HTMLElement>('*')).find(element => this.interactivityChecker.isTabbable(element));

        (focusable ?? panel).focus();
    }

    /**
     * Builds overlay configuration
     */
    private _getOverlayConfig(): OverlayConfig
    {
        const panelClass = this.popoverPanelClass();

        return new OverlayConfig(
            {
                positionStrategy: createFlexibleConnectedPositionStrategy(this.injector, this.elementRef)
                    .withFlexibleDimensions(false)
                    .withPush(false)
                    .withPositions(getPopoverPositions(this.popoverPosition(), this.popoverOffset())),
                scrollStrategy: createRepositionScrollStrategy(this.injector),
                panelClass: panelClass ? ['popover-panel'].concat(panelClass) : 'popover-panel',
            });
    }
}
