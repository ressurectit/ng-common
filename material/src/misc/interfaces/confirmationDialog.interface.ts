/**
 * Data that can be passed to confirmation dialog
 */
export interface ConfirmationDialogData
{
    /**
     * Text that is displazed as confirmation text (localization constant)
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
}