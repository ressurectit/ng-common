import {Pipe, PipeTransform} from "@angular/core";

/**
 * Returns true if object is NaN
 */
@Pipe(
{
    name: "isNaN"
})
export class IsNaNPipe implements PipeTransform
{
    //######################### public methods #########################

    /**
     * Checks whether is value NaN
     * @param value - Value to be checked
     */
    public transform(value: any): boolean
    {
        return isNaN(value);
    }
}