import {Component, ChangeDetectionStrategy, contentChild, Signal, TemplateRef, viewChild, computed, WritableSignal, signal, InputSignalWithTransform, input, booleanAttribute, InputSignal, OutputEmitterRef, output, effect} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';

import {FileInputDirective, FileTemplateContext, FileTemplateDirective} from '../../directive';
import {FILE_VISUAL} from '../../misc/tokens';
import {FileVisual} from '../../interfaces';

/**
 * Component used for obtaining file contents from disk
 */
@Component(
{
    selector: 'file',
    templateUrl: 'file.component.html',
    styleUrl: 'file.component.css',
    host:
    {
        '(click)': 'fileInput().openFileBrowser()',
    },
    imports:
    [
        NgTemplateOutlet,
        FileInputDirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileComponent
{
    //######################### protected properties - template bindings #########################

    /**
     * Instance of context for file template
     */
    protected templateContext: Signal<FileTemplateContext>;

    /**
     * Holds current value of file for file input
     */
    protected file: WritableSignal<File|null|undefined> = signal(null);

    /**
     * Holds current value of files for file input
     */
    protected files: WritableSignal<File[]|null|undefined> = signal(null);

    /**
     * Holds current value of file name for file input
     */
    protected name: WritableSignal<string|null|undefined> = signal(null);

    /**
     * Holds current value of files names for file input
     */
    protected names: WritableSignal<string[]|null|undefined> = signal(null);

    //######################### protected properties - children #########################

    /**
     * Instance template to be displayed as file input
     */
    protected fileTemplate: Signal<TemplateRef<FileTemplateContext>> = contentChild.required(FileTemplateDirective, {read: TemplateRef<FileTemplateContext>});

    /**
     * Contains file input directive instance
     */
    protected fileInput: Signal<FileInputDirective> = viewChild.required(FileInputDirective);

    /**
     * Instance of file visual implementation if available
     */
    protected fileVisual: Signal<FileVisual|undefined|null> = contentChild(FILE_VISUAL);

    //######################### public properties - inputs #########################

    /**
     * Indication whether is multiple files selection enabled
     */
    public multiple: InputSignalWithTransform<boolean, string|boolean> = input<boolean, boolean|string>(false, {transform: booleanAttribute});

    /**
     * Indication whether read file content, working only when `multiple` is not set (for single file)
     */
    public readContent: InputSignalWithTransform<boolean, string|boolean> = input<boolean, boolean|string>(false, {transform: booleanAttribute});

    /**
     * Indication whether content of file is binary and it will be read as ArrayBuffer instead of string
     */
    public binaryContent: InputSignalWithTransform<boolean, string|boolean> = input<boolean, boolean|string>(false, {transform: booleanAttribute});

    /**
     * Text encoding of read string file content
     */
    public textEncoding: InputSignal<string|undefined> = input();

    //######################### public properties - outputs #########################

    /**
     * Occurs when file changes and `binaryContent` is not set and `readContent` is set
     */
    public stringContentChange: OutputEmitterRef<string|undefined|null> = output<string|undefined|null>();

    /**
     * Occurs when file changes and `binaryContent` is set and `readContent` is set
     */
    public arrayBufferContentChange: OutputEmitterRef<ArrayBuffer|undefined|null> = output<ArrayBuffer|undefined|null>();

    /**
     * Occurs when selected file changes, occurs only when `multiple` is not set
     */
    public fileChange: OutputEmitterRef<File|null|undefined> = output<File|undefined|null>();

    /**
     * Occurs when selected files changes, occurs only when `multiple` is set
     */
    public filesChange: OutputEmitterRef<File[]|null|undefined> = output<File[]|undefined|null>();

    /**
     * Occurs when selected file changes, occurs only when `multiple` is not set, contains name of selected file
     */
    public fileName: OutputEmitterRef<string|null|undefined> = output<string|undefined|null>();

    /**
     * Occurs when selected files changes, occurs only when `multiple` is set, contains names of selected files
     */
    public filesNames: OutputEmitterRef<string[]|null|undefined> = output<string[]|undefined|null>();

    //######################### constructor #########################
    constructor()
    {
        effect(() =>
        {
            const fileVisual = this.fileVisual();

            if(fileVisual)
            {
                const fileInput = this.fileInput();

                fileVisual.fileTemplateContext.set(
                {
                    file: this.file(),
                    files: this.files(),
                    clearFile: fileInput.clearFile,
                    openFileBrowser: fileInput.openFileBrowser,
                    fileName: this.name(),
                    filesNames: this.names(),
                    multiple: this.multiple(),
                });
            }
        }, {allowSignalWrites: true});

        this.templateContext = computed(() =>
        {
            const fileInput = this.fileInput();

            return {
                file: this.file(),
                files: this.files(),
                clearFile: fileInput.clearFile,
                openFileBrowser: fileInput.openFileBrowser,
                fileName: this.name(),
                filesNames: this.names(),
                multiple: this.multiple(),
            };
        });
    }
}
