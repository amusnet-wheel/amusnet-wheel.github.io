import { html } from '@lit';
import page from '@page';

const goToMainPage = () => {
    if (!document.fullscreenElement) {
        if (typeof document.documentElement['webkitRequestFullscreen'] == 'function') {
            // safari
            document.documentElement['webkitRequestFullscreen']();
        } else {
            document.documentElement.requestFullscreen();
        }
    }

    page.redirect('/wheel');
};

const introView = () => html`
<div class="start-page">
    <div class="logo"></div>
    <button class="start-app" @click=${goToMainPage}>Start app</button>
    <div class="start-app">
        <a href="/settings">Settings</a>
    </div>
</div>
`;

/** @type {import('../index').ViewController} */
export function showIntro(ctx) {
    ctx.render(introView());
}
