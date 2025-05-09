import { html, mathml } from '@lit';

/**
 * Main view rendering the fortune wheel.
 * Handles rendering and animation in one file.
 * /**
 * @param {{ render: (content: unknown) => void }} ctx
 */

export function showWheel(ctx) {
    ctx.render(wheelTemplate(sections));
}

const sections = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
];

let animation = null;
let previousEndDegree = 0;
let previousEndSector = 0;

/**
 * Template for the wheel and spin button.
 * @param {string[]} sections
 */
const wheelTemplate = (sections) => html`
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
        <button class="spin-trigger-button" type="button" @click="${spinWheel}">
            SPIN
        </button>
    </div>
`;

/**
 * Spins the wheel.
 * @param {Event} event
 */
function spinWheel(event) {
    const wheel = /** @type {HTMLElement} */ document.getElementById('wheel');

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
}
