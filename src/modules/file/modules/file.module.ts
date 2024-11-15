import {NgModule} from '@angular/core';

import {FileComponent, FileInputComponent, UploadButtonComponent} from '../components';
import {FileInputDirective, FileTemplateDirective} from '../directive';

/**
 * Module for grouping File components and directives
 */
@NgModule(
{
    imports:
    [
        FileComponent,
        FileInputDirective,
        FileTemplateDirective,
        UploadButtonComponent,
        FileInputComponent,
    ],
    exports:
    [
        FileComponent,
        FileInputComponent,
        UploadButtonComponent,
        FileInputDirective,
        FileTemplateDirective,
    ]
})
export class FileModule
{
}
