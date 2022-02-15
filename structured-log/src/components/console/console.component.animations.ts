import {trigger, transition, style, group, animate} from '@angular/animations';

/**
 * Show hide animation for console component
 */
export const consoleAnimationTrigger = trigger('consoleAnimation', 
[
    transition(':enter', 
    [
        style(
        {
            height: 0,
            opacity: 0
        }),
        group(
        [
            animate('350ms',
                    style(
                    {
                        height: "*"
                    })),
            animate('200ms',
                    style(
                    {
                        opacity: "*"
                    }))
        ])
    ]),
    transition(':leave', 
    [
        group(
        [
            animate('350ms',
                    style(
                    {
                        height: 0
                    })),
            animate('200ms 150ms',
                    style(
                    {
                        opacity: 0
                    }))
        ])
    ])
]);