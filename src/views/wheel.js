import { html } from '@lit';

/**
 * Main view rendering the fortune wheel.
 * Handles rendering and animation in one file.
 * /**
 * @param {{ render: (content: unknown) => void }} ctx
 */

export function showWheel(ctx) {
    const sections = [
        'Quiz',
        'Water Bottle',
        'Shirt',
        'Quiz',
        'Water Bottle',
        'Shirt',
        'Quiz',
        'Water Bottle',
        'Shirt',
        'Quiz',
        'Water Bottle',
        'Shirt',
    ];

    ctx.render(wheelTemplate(sections));
}

let animation = null;
let previousEndDegree = 0;

/**
 * Template for the wheel and spin button.
 * @param {string[]} sections
 */
const wheelTemplate = (sections) => html`
    <div>
        <fieldset class="ui-wheel-of-fortune">
            <ul style="--_items: ${sections.length}">
                ${sections.map(
                    (name, index) =>
                        html` <li style="--_idx: ${index + 1}">${name}</li> `
                )}
            </ul>
            <button type="button" @click=${spinWheel}>SPIN</button>
        </fieldset>
    </div>
`;

/**
 * Spins the wheel.
 * @param {Event} event
 */
function spinWheel(event) {
    const wheel = /** @type {HTMLElement} */ (event.target)
        .previousElementSibling;

    if (!wheel) {
        return;
    }

    if (animation) {
        animation.cancel();
    }

    const randomAdditionalDegrees = Math.random() * 360 + 1800;
    const newEndDegree = previousEndDegree + randomAdditionalDegrees;

    animation = wheel.animate(
        [
            { transform: `rotate(${previousEndDegree}deg)` },
            { transform: `rotate(${newEndDegree}deg)` },
        ],
        {
            duration: 4000,
            easing: 'cubic-bezier(0.440, -0.205, 0.000, 1.130)',
            fill: 'forwards',
        }
    );

    previousEndDegree = newEndDegree;
}
