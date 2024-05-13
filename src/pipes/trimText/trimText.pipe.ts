import {Pipe, PipeTransform} from '@angular/core';

/**
 * Trims long text and adds 'suffix' indication of longer text
 */
@Pipe({name: 'trimText', standalone: true})
export class TrimTextPipe implements PipeTransform
{
    /**
     * Trims long text and adds 'suffix' indication of longer text
     * @param text - Text to be trimmed
     * @param length - Maximal allowed length of text, that wont be trimmed
     * @param suffix - Suffix to be added when text is trimmed
     */
    public transform(text: string|undefined|null, length: number, suffix: string = '...'): string
    {
        if(!text)
        {
            return '';
        }

        if(text.length > length)
        {
            return text.substring(0, length) + suffix;
        }

        return text;
    }
}
