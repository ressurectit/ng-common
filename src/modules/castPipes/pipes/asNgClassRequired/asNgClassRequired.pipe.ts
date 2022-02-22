import {Pipe} from '@angular/core';
import {Dictionary} from '@jscrpt/common';

import {AsRequiredTypePipe} from '../asRequired/asRequired.pipe';

/**
 * Transforms nullable NgClass input to NgClass non nullable input
 */
@Pipe({name: 'asNgClassRequired'})
export class AsNgClassRequiredPipe extends AsRequiredTypePipe<string|string[]|Set<string>|Dictionary<any>>
{
    /**
     * @inheritdoc
     */
    public override transform(value: string|string[]|Set<string>|Dictionary<any>|null|undefined, valueHash?: any): string|string[]|Set<string>|Dictionary<any>
    {
        return super.transform(value, '', valueHash);
    }
}