import { html } from '@lit';
import { getPrizes, getWheelSectors, setPrizes } from '../utils.js';
import { showPopup } from './popup.js';

const SPIN_TIME = 8000;
const PAUSE_AFTER_SPIN = 1000;

/**
 * Template for the wheel and spin button.
 * @param {string[]} sections
 */
const wheelTemplate = (sections, colorRange, spinWheel) => html`
    <div>
        <fieldset class="ui-wheel-of-fortune">
            <ul id="wheel" style="--_items: ${sections.length}">
                ${sections.map(
    (name, index) => html` <li class="${'wheel-color-' + ((index + 1) % colorRange)}" style="--_idx: ${index + 1}">${name}</li> `
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
    let spinning = false;
    let previousEndDegree = 0;
    let previousEndSector = 0;

    const sectors = getWheelSectors();
    const prizes = getPrizes();
    const numSectors = sectors.length;
    const colorRange = numSectors > 8 ? Math.ceil(numSectors / 2) : numSectors;

    ctx.render(wheelTemplate(sectors, colorRange, spinWheel));

    function spinWheel() {
        const wheel = /** @type {HTMLElement} */ (document.getElementById('wheel'));
        const button = /** @type {HTMLButtonElement} */ (document.querySelector('.spin-trigger-button'));

        if (!wheel || spinning) {
            return;
        }

        spinning = true;
        button.disabled = true;
        setTimeout(() => button.style.display = 'none', 200);

        const sectorSize = 360 / numSectors;
        let randomSectorOffset = ((Math.random() * numSectors) | 0) + 60;

        let newSector = previousEndSector - randomSectorOffset;
        let prizeIndex = Math.abs(newSector % numSectors);
        let prize = sectors[prizeIndex];
        let qty = Number(prizes[prize]);

        while (prize != 'Quiz' && !qty) {
            randomSectorOffset++;
            newSector--;
            prizeIndex = Math.abs(newSector % numSectors);
            prize = sectors[prizeIndex];
            qty = Number(prizes[prize]);
        }

        const randomAdditionalDegrees = randomSectorOffset * sectorSize;

        const newEndDegree =
            previousEndSector * sectorSize - randomAdditionalDegrees;

        previousEndSector -= randomSectorOffset;

        const animation = wheel.animate(
            [
                { transform: `rotate(${previousEndDegree}deg)` },
                { transform: `rotate(${newEndDegree}deg)` },
            ],
            {
                duration: SPIN_TIME,
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
                duration: PAUSE_AFTER_SPIN,
                iterations: 1,
                easing: 'ease-in-out'
            };

            document.querySelector('.ui-wheel-of-fortune .center').animate(keyframes, timing);
            document.querySelector('.ui-wheel-of-fortune .marker').animate(keyframes, timing);
        }, SPIN_TIME);

        setTimeout(() => {
            spinning = false;

            if (prize == 'Quiz') {
                ctx.page.redirect('/quiz');
            } else {
                showPopup(ctx, prize);
                prizes[prize]--;
                setPrizes(prizes);
            }
        }, SPIN_TIME + PAUSE_AFTER_SPIN);
    }
}
