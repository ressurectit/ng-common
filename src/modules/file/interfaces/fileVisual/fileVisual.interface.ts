import {WritableSignal} from '@angular/core';

import {FileTemplateContext} from '../../directive';

/**
 * Represents type that handles visualizing of file input value
 */
export interface FileVisual
{
    /**
     * Instance of file template context passed to file visual to display info about selected files
     */
    fileTemplateContext: WritableSignal<FileTemplateContext|undefined|null>;
}