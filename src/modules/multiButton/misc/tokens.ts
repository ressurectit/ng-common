import {InjectionToken} from '@angular/core';

import {MultiButtonCssClasses} from '../components/multiButton/multiButton.interface';

/**
 * Injection token for default css classes for multibutton
 */
export const MULTI_BUTTON_CSS_CLASSES: InjectionToken<MultiButtonCssClasses> = new InjectionToken<MultiButtonCssClasses>('MULTI_BUTTON_CSS_CLASSES');