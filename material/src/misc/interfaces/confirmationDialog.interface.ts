import {TemplateRef, Type} from '@angular/core';

import {ConfirmationDialogChoiceTemplateContext} from '../../directives/confirmationDialogChoiceTemplate/confirmationDialogChoiceTemplate.context';

/**
 * Css classes for confirmation dialog component
 */
export interface ConfirmationDialogCssClasses
{
    /**
     * Css classes applied to container div containing buttons
     */
    buttonsContainerDiv?: string;

    /**
     * Css classes applied to close button
     */
    closeButton?: string;

    /**
     * Css classes applied to close button icon span
     */
    closeButtonIcon?: string;

    /**
     * Css classes applied to confirm button
     */
    confirmButton?: string;

    /**
     * Css classes applied to confirm button icon span
     */
    confirmButtonIcon?: string;
}

/**
 * Options for confirmation dialog component
 */
export interface ConfirmationDialogOptions
{
    /**
     * Css classes for confirmation dialog component
     */
    cssClasses?: ConfirmationDialogCssClasses;

    /**
     * Text that is displayed as confirmation text (localization constant)
     */
    confirmationText?: string;

    /**
     * Text that is displayed as cancel button text (localization constant)
     */
    dialogCancelText?: string;

    /**
     * Text that is displayed as confirm button text (localization constant)
     */
    dialogConfirmText?: string;

    /**
     * Template used for rendering buttons container
     */
    template?: TemplateRef<ConfirmationDialogChoiceTemplateContext>;

    /**
     * Component used for rendering buttons container
     */
    choiceComponent?: Type<unknown>;
}
