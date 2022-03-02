import {InjectionToken} from '@angular/core';

import {TooltipOptions} from './tooltip.interface';

/**
 * Injection token used for injecting tooltip options
 */
export const TOOLTIP_OPTIONS: InjectionToken<Partial<TooltipOptions>> = new InjectionToken<Partial<TooltipOptions>>('TOOLTIP_OPTIONS');
