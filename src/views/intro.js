import { html } from '@lit';
import page from '@page';

const goToMainPage = () => {
    page.redirect('/wheel');
};

const introView = () => html`
<div class="start-page">
   <div class="logo"></div>
      <button class="start-app" @click=${goToMainPage}>Start app</button>
      </div>
  `;

/** @type {import('../index').ViewController} */
export function showIntro(ctx) {
    // sessionStorage.setItem('refresh-handled', 'false');
    ctx.render(introView());
}
