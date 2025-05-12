import { html, render } from '@lit';
import { createWinEffect } from './effect.js';

const popupTemplate = () => html`
    <div class="popup-splash">
        <div class="title-row">
            Your prize:
        </div>
        <div class="prize-row">
        </div>
        <div class="title-row">
            Congratulations!
        </div>
    </div>
`;

const incorrectTemplate = () => html`
    <div class="popup-splash no-prize">
        <div class="prize-row">
            Better luck<br>next time!
        </div>
    </div>
`;

export function showPopup(ctx, content, useRedirect = false, correct = true) {
    if (correct) {
        ctx.overlay(popupTemplate());
    } else {
        ctx.overlay(incorrectTemplate());
    }

    if (correct) {
        setTimeout(() => {
            const effect = createWinEffect();

            const prize = document.createElement('span');
            prize.className = 'prize-name';
            prize.textContent = content;

            const row = document.querySelector('.prize-row');
            row.appendChild(effect);
            row.appendChild(prize);

            effect['pop']();
        }, 800);
    }

    setTimeout(() => {
        const overlay = document.getElementById('overlay');

        const btn = document.createElement('button');
        btn.textContent = 'Return to Wheel';
        btn.className = 'return-button';
        btn.onclick = () => {
            overlay.remove();
            if (useRedirect) {
                ctx.page.redirect('/wheel');
            } else {
                const button = /** @type {HTMLButtonElement} */ (document.querySelector('.spin-trigger-button'));
                button.disabled = false;
                button.style.display = 'block';
            }
        };

        overlay.appendChild(btn);
    }, 3000);
}