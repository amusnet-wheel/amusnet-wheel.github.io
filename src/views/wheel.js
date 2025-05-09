import { html } from '@lit';
import { getWheelSectors } from '../utils.js';
import { showPopup } from './popup.js';

/**
 * Template for the wheel and spin button.
 * @param {string[]} sections
 */
const wheelTemplate = (sections, spinWheel) => html`
    <div>
        <fieldset class="ui-wheel-of-fortune">
            <ul id="wheel" style="--_items: ${sections.length}">
                ${sections.map(
                    (name, index) => html` <li style="--_idx: ${index + 1}">${name}</li> `
                )}
            </ul>
            <div class="circle"></div>
        </fieldset>
        <button class="spin-trigger-button" type="button" @click="${spinWheel}">
            SPIN
        </button>
    </div>
`;

/**
 * Main view rendering the fortune wheel.
 * Handles rendering and animation in one file.
 * @type {import('../index.js').ViewController}
 */
export function showWheel(ctx) {
    ctx.render(wheelTemplate(sectors, spinWheel));

    function spinWheel() {
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

        previousEndSector -= randomSectorOffset;

        const prizeIndex = Math.abs(previousEndSector % 12);
        const prize = sectors[prizeIndex];

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

        previousEndDegree = newEndDegree;

        setTimeout(() => {
            if (prize == 'Quiz') {
                ctx.page.redirect('/quiz');
            } else {
                showPopup(ctx, prize);
            }
        }, 9000);
    }
}

const sectors = getWheelSectors();

let animation = null;
let previousEndDegree = 0;
let previousEndSector = 0;
