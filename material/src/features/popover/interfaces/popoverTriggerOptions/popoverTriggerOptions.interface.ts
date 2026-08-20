import {Signal, TemplateRef} from '@angular/core';

/**
 * Options used for programmatic configuration of `PopoverTriggerDirective` directive, used when directive is applied as host directive and its configuration is owned by host component
 */
export interface PopoverTriggerOptions
{
    //######################### properties #########################

    /**
     * Signal with template rendered as popover content
     */
    content: Signal<TemplateRef<unknown>|undefined>;

    /**
     * Signal with indication whether opening of popover is blocked, already opened popover can still be closed
     */
    disabled?: Signal<boolean>;

    /**
     * Signal with indication whether popover is displayed also when trigger element obtains focus using keyboard
     */
    openOnFocus?: Signal<boolean>;
}
