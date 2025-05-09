import { html } from '@lit';

/**
 * Main view rendering the fortune wheel.
 * Handles rendering and animation in one file.
 * /**
 * @type {import('../index').ViewController} ctx
 */
/**
 * Template for the wheel and spin button.
 * @param {string[]} sections
 */
const wheelTemplate = (sections, spinWheel) => html`
    <div>
        <fieldset class="ui-wheel-of-fortune">
            <ul id="wheel" style="--_items: ${sections.length}">
                ${sections.map(
                    (name, index) =>
                        html` <li style="--_idx: ${index + 1}">${name}</li> `
                )}
            </ul>
            <div class="circle"></div>
        </fieldset>
        <div style="position: fixed; top: 0; left: 0" id="output">0</div>
        <button
            id="spin-btn"
            class="spin-trigger-button"
            type="button"
            @click="${spinWheel}"
        >
            SPIN
        </button>
    </div>
`;

const sections = [
    'Shirt',
    'Quiz',
    'Bottle',
    'Shirt',
    'Quiz',
    'Bottle',
    'Shirt',
    'Quiz',
    'Bottle',
    'Shirt',
    'Quiz',
    'Bottle',
];

let animation = null;
let previousEndDegree = 0;
let previousEndSector = 0;

const prizeTemplate = (prize) => html` <div>You Win Prize ${prize}</div> `;

export function showWheel(ctx) {
    ctx.render(wheelTemplate(sections, spinWheel));
    /**
     * Spins the wheel.
     * @param {Event} event
     */
    function spinWheel(event) {
        const wheel =
            /** @type {HTMLElement} */ document.getElementById('wheel');
        const spinButton =
            /** @type {HTMLElement} */ document.getElementById('spin-btn');

        if (!wheel) {
            return;
        }

        if (animation) {
            animation.cancel();
        }

        const sectorSize = 360 / 12;
        const randomSectorOffset = ((Math.random() * 12) | 0) + 60;
        const randomAdditionalDegrees = randomSectorOffset * sectorSize;

        const newEndDegree =
            previousEndSector * sectorSize - randomAdditionalDegrees;

        animation = wheel.animate(
            [
                { transform: `rotate(${previousEndDegree}deg)` },
                { transform: `rotate(${newEndDegree}deg)` },
            ],
            {
                duration: 8000,
                easing: 'cubic-bezier(0.440, -0.205, 0.000, 1.130)',
                fill: 'forwards',
            }
        );

        previousEndSector -= randomSectorOffset;

        const prizeIndex = Math.abs(previousEndSector % 12);

        const prize = sections[prizeIndex];

        document.getElementById('output').textContent = prize;

        setTimeout(() => {
            ctx.page.redirect('/quiz');
        }, 11000);

        setTimeout(() => {
            ctx.overlay(prizeTemplate(prize));
        }, 8500);
    }
}
