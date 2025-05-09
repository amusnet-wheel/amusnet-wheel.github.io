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
            <div class="center"></div>
            <div class="marker"></div>
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
        const button = /** @type {HTMLElement} */ (document.querySelector('.spin-trigger-button'));

        if (!wheel || spinning) {
            return;
        }

        spinning = true;
        button.style.display = 'none';

        const sectorSize = 360 / 12;
        const randomSectorOffset = ((Math.random() * 12) | 0) + 60;
        const randomAdditionalDegrees = randomSectorOffset * sectorSize;

        const newEndDegree =
            previousEndSector * sectorSize - randomAdditionalDegrees;

        previousEndSector -= randomSectorOffset;

        const prizeIndex = Math.abs(previousEndSector % 12);
        const prize = sectors[prizeIndex];

        const animation = wheel.animate(
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
            const keyframes = [
                { boxShadow: '0 0 0 0.5vh rgb(190, 197, 197), 0 -50px 0 0.5vh rgba(255, 215, 0, 0)' },
                { boxShadow: '0 0 0 0.5vh rgba(190, 197, 197, 0), 0 0 0 0.5vh rgba(255, 215, 0, 1)', offset: 0.5 },
                { boxShadow: '0 0 0 0.5vh rgb(190, 197, 197), 0 50px 0 0.5vh rgba(255, 215, 0, 0)' }
            ];
            const timing = {
                duration: 1000,
                iterations: Infinity,
                easing: 'ease-in-out'
            };

            document.querySelector('.ui-wheel-of-fortune .center').animate(keyframes, timing);
            document.querySelector('.ui-wheel-of-fortune .marker').animate(keyframes, timing);
        }, 8000);

        setTimeout(() => {
            spinning = false;

            if (prize == 'Quiz') {
                ctx.page.redirect('/quiz');
            } else {
                showPopup(ctx, prize);
            }
        }, 9000);
    }
}

const sectors = getWheelSectors();

let spinning = false;
let previousEndDegree = 0;
let previousEndSector = 0;
