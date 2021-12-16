import '@jscrpt/common';

/**
 * Enables displaying of notification when HMR finished work
 */
export function hmrFinishedNotification(): void
{
    if (jsDevMode && (module as any)['hot'])
    {
        let div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.zIndex = '54345';
        div.style.background = 'rgb(255, 255, 255) none repeat scroll 0% 0%';
        div.style.padding = '8px';
        div.style.fontWeight = 'bold';
        div.style.borderRadius = 'bold';
        div.style.color = 'rgb(21, 57, 255)';
        div.style.left = '47%';
        div.style.top = '11px';
        div.style.boxShadow = '0px 0px 4px rgb(170, 170, 170)';
        div.style.transition = 'all 500ms';
        div.style.opacity = '0';

        div.id = 'hmrdiv';
        div.innerText = 'HMR finished, app updated!';

        document.body.append(div);

        setTimeout(() => div.style.opacity = '1', 50);

        setTimeout(() =>
        {
            if(div)
            {
                div.style.opacity = '0';

                setTimeout(() =>
                {
                    div.remove();
                    div = null;
                }, 500);
            }
        }, 2000);
    }
}