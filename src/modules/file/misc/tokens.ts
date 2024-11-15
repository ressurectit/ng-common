import {InjectionToken} from '@angular/core';

import {FileVisual} from '../interfaces';

/**
 * Injection token used for obtaining implementation of file visual component
 */
export const FILE_VISUAL: InjectionToken<FileVisual> = new InjectionToken<FileVisual>('FILE_VISUAL');
