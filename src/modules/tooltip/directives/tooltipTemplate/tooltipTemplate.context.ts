/**
 * Context passed to template of tooltip
 */
export interface TooltipTemplateContext<TData = any>
{
    /**
     * Data that should be displayed in tooltip
     */
    $implicit: TData;
}