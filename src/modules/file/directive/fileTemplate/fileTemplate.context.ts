/**
 * Context passed to file template
 */
export interface FileTemplateContext
{
    /**
     * Instance of selected file or null if none is selected
     */
    file: File|undefined|null;

    /**
     * Name of selected file
     */
    fileName: string|undefined|null;

    /**
     * Instance of selected array of files or null if none is selected
     */
    files: File[]|undefined|null;

    /**
     * Array of names of selected files
     */
    filesNames: string[]|undefined|null;

    /**
     * Indication whether multiple files selection is enabled
     */
    multiple: boolean;

    /**
     * Clears selected file
     */
    clearFile(): void;
}