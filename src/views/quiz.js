// @ts-nocheck
import { html } from '@lit';
import { getQuizPrizes, setQuizPrizes } from '../utils.js';
import { showPopup } from './popup.js';
import { questions } from '../questions.js';

/**
 * Main template for questions & score.
 * @returns {import('lit-html').TemplateResult}
 */
const quizTemplate = (data, onSelect) => html`
<section>
    <div class="quizApp">
        <div class="quiz">
            <h1 id="question">${data.question}</h1>
            <ol id="answerButtons">
                ${data.answers.map((ans, i) => html`
                <button class="btn" @click=${(event) => onSelect(i, event)}>
                    <li>
                        ${ans.text}
                    </li>
                </button>`)}
            </ol>
        </div>
    </div>
</section>
`;

/** @type {import('../index.js').ViewController} */
export function showQuiz(ctx) {
    const questionIndex = Math.floor(Math.random() * questions.length);
    const question = questions[questionIndex];
    ctx.render(quizTemplate(question, selectAnswer));

    /**
     * Handle choosing an answer
     * @param {number} answerIndex
     * @param {MouseEvent} event
     */
    function selectAnswer(answerIndex, event) {
        document.querySelectorAll('button').forEach(b => b.disabled = true);
        const { correct } = question.answers[answerIndex];
        const className = correct ? 'correct' : 'incorrect';

        let btn = event.target;
        if (event.target.tagName != 'BUTTON') {
            btn = event.target.parentElement;
        }

        btn.classList.add(className);

        const prizes = getQuizPrizes();
        const stockedPrizes = Object.entries(prizes).filter(([p, qty]) => Number(qty) > 0);
        const prize = stockedPrizes[Math.floor(Math.random() * stockedPrizes.length)][0];

        setTimeout(() => {
            // showPopup(ctx, 'Pick the one you like', true, correct);
            showPopup(ctx, prize, true, correct);
            

            if (correct) {
                 prizes[prize]--;
                 setQuizPrizes(prizes);
            }
        }, 1000);
    }
}
