import {Component, ChangeDetectionStrategy, ExistingProvider, forwardRef, WritableSignal, signal, input, InputSignal, Signal, computed} from '@angular/core';
import {NgClass} from '@angular/common';
import {FirstUppercaseLocalizeSAPipe,} from '@anglr/common';

import {FILE_VISUAL} from '../../misc/tokens';
import {FileVisual} from '../../interfaces';
import {FileTemplateContext} from '../../directive';

/**
 * Component that represents file input template
 */
@Component(
{
    selector: 'file-input',
    templateUrl: 'fileInput.component.html',
    styleUrl: 'fileInput.component.css',
    standalone: true,
    imports:
    [
        NgClass,
        FirstUppercaseLocalizeSAPipe,
    ],
    providers:
    [
        <ExistingProvider>
        {
            provide: FILE_VISUAL,
            useExisting: forwardRef(() => FileInputComponent),
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileInputComponent implements FileVisual
{
    //######################### protected properties - template bindings #########################

    /**
     * Selected text value based on file template context or selected text input
     */
    protected selectedTextValue: Signal<string|undefined|null>;
    
    //######################### public properties - implementation of FileVisual #########################

    /**
     * @inheritdoc
     */
    public fileTemplateContext: WritableSignal<FileTemplateContext|undefined|null> = signal<FileTemplateContext|undefined|null>(null);

    //######################### public properties - inputs #########################

    /**
     * Text to be displayed for file button
     */
    public buttonText: InputSignal<string> = input('browse');

    /**
     * Css classes applied to file button
     */
    public buttonClass: InputSignal<string> = input('btn btn-primary');

    /**
     * Css classes applied to file text, text displaying selected files
     */
    public textClass: InputSignal<string> = input('form-control');

    /**
     * Text to be displayed as selected
     */
    public selectedText: InputSignal<string|undefined|null> = input();

    //######################### constructor #########################
    constructor()
    {
        this.selectedTextValue = computed(() =>
        {
            const context = this.fileTemplateContext();

            if(context?.multiple)
            {
                return this.selectedText() ?? context.filesNames?.join(', ');
            }

            return this.selectedText() ?? context?.fileName;
        });
    }
}