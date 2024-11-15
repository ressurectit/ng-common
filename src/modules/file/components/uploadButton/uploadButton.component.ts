import {Component, ChangeDetectionStrategy, ExistingProvider, forwardRef, WritableSignal, signal, InputSignal, input, numberAttribute, InputSignalWithTransform} from '@angular/core';
import {NgClass} from '@angular/common';
import {IsPresentPipe, LocalizeSAPipe} from '@anglr/common';

import {FILE_VISUAL} from '../../misc/tokens';
import {FileVisual} from '../../interfaces';
import {FileTemplateContext} from '../../directive';

/**
 * Component that represents upload button file template
 */
@Component(
{
    selector: 'upload-button',
    templateUrl: 'uploadButton.component.html',
    styleUrl: 'uploadButton.component.css',
    standalone: true,
    imports:
    [
        NgClass,
        IsPresentPipe,
        LocalizeSAPipe,
    ],
    providers:
    [
        <ExistingProvider>
        {
            provide: FILE_VISUAL,
            useExisting: forwardRef(() => UploadButtonComponent),
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadButtonComponent implements FileVisual
{
    //######################### public properties - implementation of FileVisual #########################

    /**
     * @inheritdoc
     */
    public fileTemplateContext: WritableSignal<FileTemplateContext|undefined|null> = signal<FileTemplateContext|undefined|null>(null);

    //######################### public properties - inputs #########################

    /**
     * Css classes applied tu button icon
     */
    public uploadIconClass: InputSignal<string> = input('fas fa-file-upload');

    /**
     * Text to be displayed as button text
     */
    public uploadText: InputSignal<string> = input('');

    /**
     * Css classes for displayed text for button
     */
    public uploadTextClass: InputSignal<string> = input('first-letter-uppercase');

    /**
     * Css class applied to button
     */
    public cssClass: InputSignal<string> = input('btn btn-icon', {alias: 'class'});

    /**
     * Current progress to be displayed
     */
    public progress: InputSignalWithTransform<number|undefined|null, number|string|undefined|null> = input<number|undefined|null, number|string|undefined|null>(null, {transform: numberAttribute});
}