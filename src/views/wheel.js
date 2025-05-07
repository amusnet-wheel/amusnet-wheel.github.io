import { html } from '@lit';

const wheelView = (sections) => html`
<h1>Wheel Page</h1>
<section>
    ${sections.map(wheelSection)}
</section>`;

const wheelSection = (name) => html`
<div>${name}</div>`;

/** @type {import('../index').ViewController} */
export function showWheel(ctx) {
    const sections = [
        'Quiz',
        'Water Bottle',
        'Shirt'
    ];
    ctx.render(wheelView(sections));
}