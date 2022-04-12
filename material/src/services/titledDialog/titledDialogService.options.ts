import {Type} from '@angular/core';
import {isPresent} from '@jscrpt/common';

import {TitledDialogComponent} from '../../components/titledDialog/titledDialog.component';

/**
 * Options for `TitledDialogService`
 */
export class TitledDialogServiceOptions
{
    //######################### public properties #########################

    /**
     * Type of component used for rendering titled dialog
     */
    public titledDialogComponent: Type<any> = TitledDialogComponent;

    //######################### constructor #########################
    constructor(titledDialogComponent?: Type<any>)
    {
        if(isPresent(titledDialogComponent))
        {
            this.titledDialogComponent = titledDialogComponent;
        }
    }
}
