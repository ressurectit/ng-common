import {booleanAttribute, Directive, effect, ElementRef, input, InputSignal, InputSignalWithTransform, OnDestroy, output, OutputEmitterRef, Renderer2} from '@angular/core';
import {BindThis, isString, NoopAction} from '@jscrpt/common';

/**
 * Directive that allows better communication with input file
 */
@Directive(
{
    selector: 'input[type=file]',
    exportAs: 'file',
})
export class FileInputDirective implements OnDestroy
{
    //######################### protected fields #########################

    /**
     * Unlistener for input file change event
     */
    protected changeListenerUnlisten: NoopAction;

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

    //######################### constructors #########################
    constructor(protected element: ElementRef<HTMLInputElement>,
                renderer: Renderer2,)
    {
        this.changeListenerUnlisten = renderer.listen(element.nativeElement, 'change', this.handleFileChange);

        effect(() => renderer.setProperty(element.nativeElement, 'multiple', this.multiple()));
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * @inheritdoc
     */
    public ngOnDestroy(): void
    {
        this.changeListenerUnlisten();
    }

    //######################### public methods #########################

    /**
     * Clears selection of file/files
     */
    @BindThis
    public clearFile(): void
    {
        this.element.nativeElement.value = '';
        this.fileChange.emit(null);
        this.fileName.emit(null);
        this.filesChange.emit(null);
        this.filesNames.emit(null);
        this.arrayBufferContentChange.emit(null);
        this.stringContentChange.emit(null);
    }

    //######################### protected methods #########################

    /**
     * Handles changes in file input
     */
    @BindThis
    protected handleFileChange(event: MouseEvent): void
    {
        if(!event.target)
        {
            throw new Error('FileOutputDirective: missing input file target!');
        }

        if(this.multiple())
        {
            const files = (event.target as HTMLInputElement).files;
            const filesArray: File[] = [];

            if(files)
            {
                for(let x = 0; x < files.length; x++)
                {
                    filesArray.push(files[x]);
                }
            }

            this.filesChange.emit(filesArray);
            this.filesNames.emit(filesArray.map(itm => itm.name));
        }
        else
        {
            const file = (event.target as HTMLInputElement).files?.[0];

            this.fileChange.emit(file);
            this.fileName.emit(file?.name);
        }

        //read file contents
        if(!this.multiple() && this.readContent())
        {
            const file = (event.target as HTMLInputElement).files?.[0];

            //no file selected
            if(!file)
            {
                return;
            }

            const fileReader = new FileReader();
    
            fileReader.onloadend = () =>
            {
                const result = fileReader.result;

                if(!result)
                {
                    this.stringContentChange.emit(null);
                    this.arrayBufferContentChange.emit(null);

                    return;
                }

                if(isString(result))
                {
                    this.stringContentChange.emit(result);
                }
                else
                {
                    this.arrayBufferContentChange.emit(result);
                }
            };
    
            if(this.binaryContent())
            {
                fileReader.readAsArrayBuffer(file);
            }
            else
            {
                fileReader.readAsText(file, this.textEncoding());
            }
        }
    }
}