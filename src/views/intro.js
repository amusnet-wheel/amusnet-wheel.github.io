import { html } from '@lit';

const introView = () => html`
<h1>Intro Page</h1>`;

/** @type {import('../index').ViewController} */
export function showIntro(ctx) {
    ctx.render(introView());
}